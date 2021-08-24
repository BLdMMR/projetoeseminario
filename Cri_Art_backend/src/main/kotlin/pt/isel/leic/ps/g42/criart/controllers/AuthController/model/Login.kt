package pt.isel.leic.ps.g42.criart.controllers.AuthController.model

import pt.isel.leic.ps.g42.criart.models.Token
import pt.isel.leic.ps.g42.criart.models.UserType
import java.util.*

data class LoginRequest (
    val email: String,
    val password: String
)

data class LoginResponse(
    val id: UUID?,
    val name: String?,
    val emailAddress: String?,
    val type: UserType?,
    var hasProfile: Boolean?,
    var listOfFollows: List<UUID>?,
    var enabled: Boolean?,
    val token: UUID,
)

data class SignUpResponse(
    val message: String
)

data class HasProfile(
    val hasProfile: Boolean
)