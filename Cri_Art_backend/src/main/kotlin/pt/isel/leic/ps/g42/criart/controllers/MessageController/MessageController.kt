package pt.isel.leic.ps.g42.criart.controllers.MessageController

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.LoggerFactory
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

    private val log = LoggerFactory.getLogger(this::class.simpleName)

    private fun sendMessage(session: WebSocketSession?, message: Message) {
        val payload: String = this.objectMapper.writeValueAsString(message)

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

        log.info("Message from: ${user.username}")

        messageInput.messageId?.let {
            val messageEntity = this.messageService.acknowledgeMessage(messageInput.messageId)
            this.sendMessage(session, messageEntity)
        } ?: run {
            val messageEntity = this.messageService.addMessage(
                    user.username!!,
                    messageInput.newMessage!!.recipientUsername,
                    messageInput.newMessage!!.message)

            val receiverSession = openSessions[messageInput.newMessage!!.recipientUsername]

            this.sendMessage(receiverSession, messageEntity)
            this.sendMessage(session, messageEntity)
        }

    }
}