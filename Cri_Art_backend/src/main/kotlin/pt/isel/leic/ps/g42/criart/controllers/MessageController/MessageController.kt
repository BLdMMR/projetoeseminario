package pt.isel.leic.ps.g42.criart.controllers.MessageController

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import pt.isel.leic.ps.g42.criart.models.Message
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.services.MessageService
import java.util.*
import java.util.concurrent.ConcurrentHashMap


@Component
class MessageController(
        val messageService: MessageService,
        val objectMapper: ObjectMapper
): TextWebSocketHandler() {

    companion object {
        private val openSessions: ConcurrentHashMap<String, WebSocketSession> = ConcurrentHashMap()
    }

    private fun sendMessage(session: WebSocketSession?, message: Message) {

        val outbound = OutboundMessage(message.id.toString(), message.senderUsername, message.message, message.timestamp)
        val payload: String = this.objectMapper.writeValueAsString(outbound)

        val websocketMessage = TextMessage(payload)
        session?.sendMessage(websocketMessage)
    }

    @Override
    override fun afterConnectionEstablished(session: WebSocketSession) {
        val user: User = session.attributes["user"] as User
        openSessions[user.username!!] = session
        val messages = this.messageService.getMessages(user.username!!)

        messages.forEach { message -> this.sendMessage(session, message) }
    }

    @Override
    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        val user: User = session.attributes["user"] as User
        openSessions.remove(user.username)
    }

    @Override
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        val payloadString: String = message.payload
        if (payloadString == "__keepalive_ping__") {
            session.sendMessage(TextMessage("__keepalive_pong__"))
            return
        }
        val messageInput: InboundMessage = this.objectMapper.readValue(payloadString)

        val user: User = session.attributes["user"] as User
        val messageEntity = this.messageService.addMessage(user.username!!, messageInput.recipientUsername, messageInput.message)

        val receiverSession = openSessions[messageInput.recipientUsername]
        this.sendMessage(receiverSession, messageEntity)
        this.sendMessage(session, messageEntity)
    }
}