package pt.isel.leic.ps.g42.criart.controllers.MessageController

import java.util.*

data class InboundMessage(
    val receiverId: UUID,
    val senderId: UUID,
    val message: String
)
