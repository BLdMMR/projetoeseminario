package pt.isel.leic.ps.g42.criart.controllers.AuthController.model

import pt.isel.leic.ps.g42.criart.models.Token
import pt.isel.leic.ps.g42.criart.models.UserType
import java.util.*

data class LoginRequest (
    val email: String,
    val password: String
)

data class LoginResponse(
    val id: UUID = UUID(0L, 0L),
    val name: String = "",
    val emailAddress: String = "",
    val type: UserType,
    var hasProfile: Boolean = false,
    var listOfFollows: List<UUID> = emptyList(),
    var enabled: Boolean = false,
    val token: UUID,
)
data class SignUpResponse(
    val message: String
)

data class HasProfile(
    val hasProfile: Boolean
)