package pt.isel.leic.ps.g42.Cri_Art.services.auth

import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.Cri_Art.models.User
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IUserRepository

@Service
class AuthUserService(
    private val userRepository: IUserRepository
) {

    fun registerNewUser(user: User) {
        val saved = this.userRepository.save(user)


    }
}