package pt.isel.leic.ps.g42.Cri_Art.services.auth

import io.netty.handler.codec.base64.Base64Encoder
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.util.Base64Utils
import pt.isel.leic.ps.g42.Cri_Art.filters.auth.AuthenticationFilter
import pt.isel.leic.ps.g42.Cri_Art.models.Token
import pt.isel.leic.ps.g42.Cri_Art.models.TokenType
import pt.isel.leic.ps.g42.Cri_Art.models.User
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.ITokenRepository
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IUserRepository
import java.lang.RuntimeException
import java.security.MessageDigest
import java.util.*

@Service
class AuthService(
    private val userRepository: IUserRepository,
    private val tokenRepository: ITokenRepository
) {
    companion object {
        private fun digestPassword(password: String): String {
            val decodedPassword = Base64Utils.decodeFromString(password)
            val hashPassBytes = MessageDigest.getInstance("SHA-256").digest(decodedPassword)
            val hashPassEncodedBytes = Base64Utils.encode(hashPassBytes)
            return String(hashPassEncodedBytes)
        }
    }

    private val log = java.util.logging.Logger.getLogger(AuthService::class.java.name)

    fun getLoggedInUser(token: UUID): User? {
        val tokenEnt: Token? = this.tokenRepository.findByIdOrNull(token)
        return this.userRepository.findByIdOrNull(tokenEnt?.userId)
    }

    fun registerNewUser(name: String, emailAddress: String, password: String) {
        val hashPassEncoded = digestPassword(password)
        val newUser = User(id = UUID.randomUUID(), name = name, emailAddress = emailAddress, password = hashPassEncoded)
        this.userRepository.save(newUser)
    }

    fun loginUser(email: String, password: String): UUID {

        val user: User? = this.userRepository.findByEmail(email, Pageable.unpaged())
            .get().findAny().orElse(null)

        this.log.warning("user with given email $email has been found with id: ${user?.id}")

        val hashPassEncoded = digestPassword(password)
        if (hashPassEncoded != user?.password) {
            throw RuntimeException("login failed!")
        }

        val token = Token(userId = user.id, token = UUID.randomUUID(), TokenType.SIGNIN)
        this.tokenRepository.save(token)
        return token.token
    }

    fun logoutUser(token: UUID) {
        val tokenEnt: Token? = this.tokenRepository.findByIdOrNull(token)
        if (tokenEnt != null) {
            this.tokenRepository.deleteById(token)
        } else {
            //TODO
        }
    }

}