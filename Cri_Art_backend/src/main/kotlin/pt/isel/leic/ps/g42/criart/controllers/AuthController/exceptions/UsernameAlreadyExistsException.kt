package pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions

import pt.isel.leic.ps.g42.criart.controllers.exceptions.EntityAlreadyExistsException

class UsernameAlreadyExistsException(username: String) :
    EntityAlreadyExistsException(
        title = "Username already taken!",
        message = "User with the following username already exists: $username"
    )