package pt.isel.leic.ps.g42.criart.controllers.AuthController.model

import java.util.*

data class LoginRequest (
    val email: String,
    val password: String
)

data class LoginResponse(
    val token: UUID?
)

data class SignUpResponse(
    val message: String
)