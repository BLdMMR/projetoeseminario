package pt.isel.leic.ps.g42.criart.controllers.AuthController.model


data class SignupRequest(
    val username: String,
    val email: String,
    val password: String,
    val type: String
)
