package pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController.model

import java.util.*

data class LoginRequest (
    val email: String,
    val password: String
)

data class LoginResponse(
    val token: UUID
)