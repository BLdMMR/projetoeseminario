package pt.isel.leic.ps.g42.Cri_Art.services.auth

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IUserRepository
import java.lang.RuntimeException


@Service
class RegisteredUserDetailsService(
    private val userRepository: IUserRepository
): UserDetailsService {

    override fun loadUserByUsername(emailAddress: String): UserDetails {
        val user = this.userRepository.findById(emailAddress)
            .orElseThrow { RuntimeException("User with email: $emailAddress was not found!") }

        return User.builder()
                .username(user.emailAddress)
                .password(user.password)
                .build()
    }
}