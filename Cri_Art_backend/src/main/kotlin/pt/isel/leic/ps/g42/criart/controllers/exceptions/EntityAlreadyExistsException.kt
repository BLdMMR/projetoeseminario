package pt.isel.leic.ps.g42.criart.controllers.exceptions

open class EntityAlreadyExistsException(
    val title: String,
    message: String
) : RuntimeException(message)