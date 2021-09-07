package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.models.Message
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.storage.irepositories.IMessageRepository
import java.time.LocalDateTime
import java.util.*
import kotlin.collections.HashMap

@Service
class MessageService(private val messageRepository: IMessageRepository) {

    fun addMessage(sourceUserId: UUID, destinationUserId: UUID, message: String): Message {
        val newMessage = Message(UUID.randomUUID(), sourceUserId, destinationUserId, message, LocalDateTime.now())
        this.messageRepository.save(newMessage)
        return newMessage
    }

    fun getMessages(userId: UUID) {

    }

}