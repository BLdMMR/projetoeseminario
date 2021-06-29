package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

enum class UserType {
    ARTIST,
    CLIENT,
    MODERATOR
}

@Document(indexName = "user")
data class User(
    @Id
    val id: UUID = UUID(0L, 0L),
    val name: String = "",
    val emailAddress: String = "",
    val password: String = "",
    val type: UserType? = null
)