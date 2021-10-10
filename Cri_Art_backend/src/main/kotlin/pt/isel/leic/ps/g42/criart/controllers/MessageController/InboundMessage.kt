package pt.isel.leic.ps.g42.criart.controllers.MessageController

import java.util.*


data class InboundMessage(
    val messageId: UUID?,
    val newMessage: NewMessage?
)

data class NewMessage(
    val recipientUsername: String,
    val message: String
)

