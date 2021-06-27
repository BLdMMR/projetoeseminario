package pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions

import java.lang.RuntimeException

class UserEmailAlreadyExistsException(email: String): RuntimeException("User with the following email already exists: $email")