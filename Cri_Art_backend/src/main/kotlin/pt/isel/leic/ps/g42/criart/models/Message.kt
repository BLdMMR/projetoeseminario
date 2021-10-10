package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

@Document(indexName = "message")
data class Message (
    @Id
    val id: UUID,
    val senderUsername: String,
    val recipientUsername: String,
    val message: String,
    val timestamp: Long,
    var hasBeenRead: Boolean = false
) 