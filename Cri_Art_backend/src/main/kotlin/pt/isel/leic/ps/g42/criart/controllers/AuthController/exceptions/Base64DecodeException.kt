package pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions

import java.lang.RuntimeException

class Base64DecodeException(base64String: String): RuntimeException("Invalid Base64 string: $base64String")