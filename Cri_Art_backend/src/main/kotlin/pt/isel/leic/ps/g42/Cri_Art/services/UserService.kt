package pt.isel.leic.ps.g42.Cri_Art.services

import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service


@Service
class UserService (private val repository: UserRepository){

    fun signUpUser(username :String , name :String, password :String, mail :String) : ProtectedUser? {
        return null
    }

}
