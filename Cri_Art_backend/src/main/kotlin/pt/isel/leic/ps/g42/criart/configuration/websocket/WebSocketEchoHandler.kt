package pt.isel.leic.ps.g42.criart.configuration.websocket

import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler

class WebSocketEchoHandler: TextWebSocketHandler() {

    @Override
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        val echo = "Echo: " + message.payload
        session.sendMessage(TextMessage(echo))
    }

}