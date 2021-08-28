package pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions

import pt.isel.leic.ps.g42.criart.controllers.exceptions.EntityAlreadyExistsException
import java.lang.RuntimeException

class UserEmailAddressAlreadyExistsException(email: String) :
    EntityAlreadyExistsException(title = "Email address already taken!", message = "User with the following email already exists: $email")