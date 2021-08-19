package pt.isel.leic.ps.g42.criart.controllers.AuthController.model

import com.fasterxml.jackson.annotation.JsonCreator


data class SignupRequest @JsonCreator constructor(
    val username: String,
    val email: String,
    val password: String,
    val type: String = "CLIENT"
)
