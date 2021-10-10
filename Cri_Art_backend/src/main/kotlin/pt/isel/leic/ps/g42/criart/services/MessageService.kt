package pt.isel.leic.ps.g42.criart.services

import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.models.Message
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.storage.irepositories.IMessageRepository
import java.time.LocalDateTime
import java.util.*
import kotlin.collections.HashMap

@Service
class MessageService(private val messageRepository: IMessageRepository) {

    fun addMessage(sourceUsername: String, destinationUsername: String, message: String): Message {
        val newMessage = Message(UUID.randomUUID(), sourceUsername, destinationUsername, message, System.currentTimeMillis(), false)
        this.messageRepository.save(newMessage)
        return newMessage
    }

    fun acknowledgeMessage(messageId: UUID): Message {
        val newMessage = this.messageRepository.findById(messageId).get()
        newMessage.hasBeenRead = true
        this.messageRepository.save(newMessage)
        return newMessage
    }

    fun getMessages(username: String): Array<Message> {
        val result = this.messageRepository.findByUsername(username, username, Pageable.unpaged())
                                            .get().toArray { size -> Array<Message?>(size) { _ -> null } }
        return result as Array<Message>
    }

}