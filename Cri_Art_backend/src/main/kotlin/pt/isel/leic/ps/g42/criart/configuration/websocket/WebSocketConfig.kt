package pt.isel.leic.ps.g42.criart.configuration.websocket

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor

@Configuration
@EnableWebSocket
class WebSocketConfig: WebSocketConfigurer {

    @Override
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(echoHandlerFactory(), "/echo")
            .setAllowedOrigins("*")
            .addInterceptors(HttpSessionHandshakeInterceptor())
    }

    @Bean
    fun echoHandlerFactory(): WebSocketHandler {
        return WebSocketEchoHandler()
    }

    @Bean
    fun createWebSocketContainer(): ServletServerContainerFactoryBean {
        val container = ServletServerContainerFactoryBean()
        container.setMaxBinaryMessageBufferSize(8192)
        container.setMaxTextMessageBufferSize(8192)
        return container
    }

}