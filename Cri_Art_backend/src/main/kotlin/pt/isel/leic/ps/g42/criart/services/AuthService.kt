package pt.isel.leic.ps.g42.criart.services

import org.elasticsearch.ElasticsearchException
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.util.Base64Utils
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.*
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginResponse
import pt.isel.leic.ps.g42.criart.models.Token
import pt.isel.leic.ps.g42.criart.models.TokenType
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.models.UserType
import pt.isel.leic.ps.g42.criart.storage.irepositories.ITokenRepository
import pt.isel.leic.ps.g42.criart.storage.irepositories.IUserRepository
import java.security.MessageDigest
import java.util.*
import java.util.logging.Logger

@Service
class AuthService(
    private val userRepository: IUserRepository,
    private val tokenRepository: ITokenRepository,
    private val emailService: EmailService
) {
    companion object {
        private val digestInstance = MessageDigest.getInstance("SHA-256")

        private fun digestPassword(password: String): String {
            var decodedPassword: ByteArray
            try {
                decodedPassword = Base64Utils.decodeFromString(password)
            } catch (e: IllegalArgumentException) {
                throw Base64DecodeException(password)
            }
            val hashPassBytes = digestInstance.digest(decodedPassword)
            val hashPassEncodedBytes = Base64Utils.encode(hashPassBytes)
            return String(hashPassEncodedBytes)
        }
    }

    private val log = Logger.getLogger(AuthService::class.java.name)

    fun signupUser(name: String, emailAddress: String, password: String, type: String) {
        val hashPassEncoded = digestPassword(password)
        var existingUser: User? = null
        try{
            println(emailAddress)
            existingUser = this.userRepository.findByEmail(emailAddress, Pageable.unpaged())
                .get().findAny().orElse(null)
            println("Existing User:")
            println(existingUser)
        } catch (exception: ElasticsearchException) {
            log.info("Elasticsearch index not found")
        }
        if (existingUser!!.emailAddress == emailAddress) {
            throw UserEmailAlreadyExistsException(emailAddress)
        }

        val newUser = User(id = UUID.randomUUID(), name = name, emailAddress = emailAddress,
            password = hashPassEncoded, enabled = false, type = UserType.valueOf(type))

        println("User: \nId: ${newUser.id}\nName: ${newUser.name}\nEmail: ${newUser.emailAddress}\nPassword: ${newUser.password}\nType: ${newUser.type}\nEnabled: ${newUser.enabled}")
        println(newUser)
        this.userRepository.save(newUser)

        val token = Token(userId = newUser.id, token = UUID.randomUUID(), type = TokenType.SIGNUP)
        this.tokenRepository.save(token)

        this.emailService.sendRegistrationMail(emailAddress, token.token)
    }

    fun loginUser(email: String?, password: String?): LoginResponse {
        if (email == null || password == null) {
            throw LoginFailedException()
        }
        val user: User? = this.userRepository.findByEmail(email, Pageable.unpaged())
            .get().findAny().orElse(null)

        if (user == null) {
            this.log.warning("User with given email $email was not found!")
            throw LoginFailedException()
        }

        val hashPassEncoded = digestPassword(password)
        if (hashPassEncoded != user.password) {
            this.log.warning("Invalid Password")
            throw LoginFailedException()
        }

        val token = Token(userId = user.id, token = UUID.randomUUID(), type = TokenType.LOGIN)
        this.tokenRepository.save(token)
        return LoginResponse(token.token, user.type)
    }

    fun logoutUser(token: String) {
        val parsedToken: UUID
        try {
            parsedToken = UUID.fromString(token)
        } catch (exception: IllegalArgumentException) {
            throw MalformedTokenException()
        }
        val tokenEnt: Token? = this.tokenRepository.findByIdOrNull(parsedToken)
        if (tokenEnt?.type == TokenType.LOGIN) {
            this.tokenRepository.deleteById(parsedToken)
        } else {
            throw TokenNotFoundException()
        }
    }

    fun getLoggedInUser(token: UUID): User? {
        val tokenEnt: Token? = this.tokenRepository.findByIdOrNull(token)
        if (tokenEnt == null) {
            this.log.warning("Token not found in the database: $token")
            return null
        }
        if (tokenEnt.type != TokenType.LOGIN) {
            this.log.warning("Token of wrong type found: ${tokenEnt.type} instead of ${TokenType.LOGIN}")
            return null
        }
        val user = this.userRepository.findByIdOrNull(tokenEnt.userId)
        if (user == null) {
            log.warning("User with id ${tokenEnt.userId} not found from token: ${tokenEnt.token}")
        }
        return user
    }

    fun confirmSignup(token: String): User? {
        val parsedToken: UUID
        try {
            parsedToken = UUID.fromString(token)
        } catch (exception: IllegalArgumentException) {
            throw MalformedTokenException()
        }

        val tokenEnt: Token? = this.tokenRepository.findByIdOrNull(parsedToken)

        if (tokenEnt == null) {
            this.log.warning("Token not found in the database: $token")
            throw TokenNotFoundException()
        }

        if (tokenEnt.type != TokenType.SIGNUP) {
            this.log.warning("Token of wrong type found: ${tokenEnt.type} instead of ${TokenType.SIGNUP}")
            throw TokenNotFoundException()
        }
        val user = this.userRepository.findByIdOrNull(tokenEnt.userId)
        if (user == null || user.enabled) {
            log.warning("Disabled user with id ${tokenEnt.userId} not found from token: ${tokenEnt.token}")
            return null
        }
        user.enabled = true
        this.userRepository.save(user)

        return user
    }

    fun hasProfile(token: UUID) : Boolean? {
        val user :User? = getLoggedInUser(token)
        return user?.hasProfile
    }
}