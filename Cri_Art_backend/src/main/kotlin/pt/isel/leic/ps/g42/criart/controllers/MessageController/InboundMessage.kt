package pt.isel.leic.ps.g42.criart.controllers.MessageController



data class InboundMessage(
    val recipientUsername: String,
    val message: String
)