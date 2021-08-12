package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginResponse
import java.util.*

enum class UserType {
    ARTIST,
    CLIENT,
    MODERATOR;
    fun parse(type: String) : UserType? {
        when(type){
            "CLIENT" -> return CLIENT
            "ARTIST" -> return ARTIST
            "MODERATOR" -> return MODERATOR
            else -> return null
        }
    }
}

@Document(indexName = "user")
data class User(
    @Id
    val id: UUID = UUID(0L, 0L),
    val name: String = "",
    val emailAddress: String = "",
    val password: String = "",
    val type: UserType,
    var hasProfile: Boolean = false,
    var listOfFollows: List<UUID> = emptyList(),
    var enabled: Boolean = false
){
    fun toLoginResponse(token: UUID): LoginResponse{
        return LoginResponse(id, name, emailAddress, type, hasProfile, listOfFollows, enabled, token)
    }
}