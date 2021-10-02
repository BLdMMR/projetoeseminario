package pt.isel.leic.ps.g42.criart.controllers.MessageController

data class OutboundMessage(
    val messageId: String,
    val senderUsername: String,
    val message: String,
    val time: Long
)