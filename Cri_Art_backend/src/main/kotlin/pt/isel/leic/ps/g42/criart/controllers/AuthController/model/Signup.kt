package pt.isel.leic.ps.g42.criart.controllers.AuthController.model


data class SignupRequest (
    val name: String,
    val email: String,
    val password: String
)
