package pt.isel.leic.ps.g42.Cri_Art.services

import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IUserRepository


@Service
class UserService (private val repository: IUserRepository){

    fun signUpUser(name :String, password :String, mail :String) {
    }

}
