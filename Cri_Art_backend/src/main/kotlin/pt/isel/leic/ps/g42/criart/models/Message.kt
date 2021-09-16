package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.time.LocalDateTime
import java.util.*

@Document(indexName = "message")
data class Message (
    @Id
    val id: UUID,
    val sourceUserId: UUID,
    val destinationUserId: UUID,
    val message: String,
    val date: LocalDateTime
)