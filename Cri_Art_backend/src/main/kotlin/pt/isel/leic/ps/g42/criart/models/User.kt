package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginResponse
import java.util.*

enum class UserType {
    ARTIST,
    CLIENT,
    MODERATOR
}

@Document(indexName = "user")
data class User(
    @Id
    var id: UUID?,
    var username: String?,
    var emailAddress: String?,
    var password: String?,
    var type: UserType?,
    var hasProfile: Boolean? = false,
    var listOfFollows: List<UUID>? = emptyList(),
    var enabled: Boolean? = false
) {
    fun toLoginResponse(token: UUID): LoginResponse {
        return LoginResponse(id, username, emailAddress, type, hasProfile, listOfFollows, enabled, token)
    }
}