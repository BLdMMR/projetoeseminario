package pt.isel.leic.ps.g42.criart.configuration.websocket

import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import org.springframework.web.socket.handler.TextWebSocketHandler
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor
import pt.isel.leic.ps.g42.criart.controllers.MessageController.MessageController
import pt.isel.leic.ps.g42.criart.models.User
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Configuration
@EnableWebSocket
class WebSocketConfig(val messageController: MessageController): WebSocketConfigurer {

    companion object {
        private val log = LoggerFactory.getLogger(this::class.java.name)
        private const val ECHO_PATH = "/echo"
        private const val MESSAGE_PATH = "/message"
    }


    @Override
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(echoHandlerFactory(), ECHO_PATH)
                .addHandler(messageHandlerFactory(), MESSAGE_PATH)
            .setAllowedOrigins("*")
            .addInterceptors(HttpSessionHandshakeInterceptor())
    }

    @Bean
    fun echoHandlerFactory(): WebSocketHandler {
        return WebSocketEchoHandler()
    }

    @Bean
    fun messageHandlerFactory(): WebSocketHandler {
        return this.messageController
    }

    @Bean
    fun createWebSocketContainer(): ServletServerContainerFactoryBean {
        val container = ServletServerContainerFactoryBean()
        container.setMaxBinaryMessageBufferSize(8192)
        container.setMaxTextMessageBufferSize(8192)
        return container
    }

}

class WebSocketEchoHandler: TextWebSocketHandler() {

    companion object {
        private val openSessions: ConcurrentHashMap<UUID, WebSocketSession> = ConcurrentHashMap()
    }

    private val log = LoggerFactory.getLogger(this::class.java.name)


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
    override fun handleTextMessage(senderSession: WebSocketSession, message: TextMessage) {
        val user: User = senderSession.attributes["user"] as User

        val echo = """Echo from ${user.username}: ${message.payload}"""
        for (session in openSessions.values) {
            session.sendMessage(TextMessage(echo))
        }
    }
}