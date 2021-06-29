package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.storage.irepositories.IUserRepository


@Service
class UserService (private val repository: IUserRepository){

    fun signUpUser(name :String, password :String, mail :String) {
    }

}
