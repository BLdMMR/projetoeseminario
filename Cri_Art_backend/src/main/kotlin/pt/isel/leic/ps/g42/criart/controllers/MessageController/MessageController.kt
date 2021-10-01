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
        private val openSessions: ConcurrentHashMap<UUID, WebSocketSession> = ConcurrentHashMap()
    }

    @Override
    override fun afterConnectionEstablished(session: WebSocketSession) {
        val user: User = session.attributes["user"] as User
        openSessions[user.id!!] = session

    }

    @Override
    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        val user: User = session.attributes["user"] as User
        openSessions.remove(user.id)
    }

    @Override
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {

        val jsonString: String = message.payload
        println(jsonString)
        val msg: InboundMessage = this.objectMapper.readValue(jsonString)
        println(msg)

//        val messageInput: InboundMessage = this.objectMapper.readValue(jsonString)
//
//        val user: User = session.attributes["user"] as User
//        this.messageService.addMessage(user.id!!, messageInput.receiverId, messageInput.message)
//
//        val receiverSession = openSessions[messageInput.receiverId]
//        receiverSession?.sendMessage(message)
    }
}