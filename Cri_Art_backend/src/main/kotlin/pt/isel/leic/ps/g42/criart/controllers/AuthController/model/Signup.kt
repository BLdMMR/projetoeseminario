package pt.isel.leic.ps.g42.criart.controllers.AuthController.model

import com.fasterxml.jackson.annotation.JsonCreator


data class SignupRequest @JsonCreator constructor(
    val name: String,
    val email: String,
    val password: String,
    val userType: String
)
