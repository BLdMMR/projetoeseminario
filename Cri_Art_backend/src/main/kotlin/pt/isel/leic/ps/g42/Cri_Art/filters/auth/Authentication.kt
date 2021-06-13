package pt.isel.leic.ps.g42.Cri_Art.filters.auth

import pt.isel.leic.ps.g42.Cri_Art.models.User
import pt.isel.leic.ps.g42.Cri_Art.services.UserService
import java.security.MessageDigest
import java.util.*

fun turnToHash(content :String) : String{
    val bytes = content.toByteArray()
    val md = MessageDigest.getInstance("SHA-256")
    val digest = md.digest(bytes)
    return digest.fold("") {str, it -> str + "%02x".format(it)}
}

fun decodeBase64(credential :String) :List<String> {
    return String(Base64.getDecoder().decode(credential)).split(":")
}

fun authenticate(userService : UserService, username: String, password: String) : User?{
    return null
}