package pt.isel.leic.ps.g42.criart.controllers.AuthController.model

import pt.isel.leic.ps.g42.criart.models.UserType
import java.util.*

data class LoginRequest (
    val email: String,
    val password: String
)

data class LoginResponse(
    val token: UUID?,
    val id: UUID? = null,
    val type: UserType? = null
)

data class SignUpResponse(
    val message: String
)

data class HasProfile(
    val hasProfile: Boolean
)