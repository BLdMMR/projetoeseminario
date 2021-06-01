package pt.isel.leic.ps.g42.Cri_Art.services.auth

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IUserRepository
import java.lang.RuntimeException
import java.util.logging.Logger


@Service
class RegisteredUserDetailsService(
    private val userRepository: IUserRepository
): UserDetailsService {
    companion object {
        val LOGGER: Logger = Logger.getLogger(UserDetailsService::class.java.name)
    }

    override fun loadUserByUsername(emailAddress: String): UserDetails {
        val user = this.userRepository.findById(emailAddress)
            .orElseThrow { RuntimeException("User with email: $emailAddress was not found!") }

        LOGGER.info("Request loading user: $emailAddress")

        println("Request loading user: $emailAddress")

        return User.builder()
                .username(user.emailAddress)
                .password(user.password)
                .build()
    }
}