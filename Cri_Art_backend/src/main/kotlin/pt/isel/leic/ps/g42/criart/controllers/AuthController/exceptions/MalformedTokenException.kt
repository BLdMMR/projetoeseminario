package pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions

import java.lang.RuntimeException

class MalformedTokenException: RuntimeException("Invalid token format!")