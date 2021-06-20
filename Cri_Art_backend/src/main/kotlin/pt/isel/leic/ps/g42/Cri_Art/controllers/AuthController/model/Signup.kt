package pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController.model


data class SignupRequest (
    val name: String,
    val email: String,
    val password: String
)
