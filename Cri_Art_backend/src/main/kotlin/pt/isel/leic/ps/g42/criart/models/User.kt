package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

enum class UserType {
    ARTIST,
    CLIENT,
    MODERATOR;
    fun parse(type: String) : UserType? {
        return when(type) {
            "CLIENT" -> CLIENT
            "ARTIST" -> ARTIST
            "MODERATOR" -> MODERATOR
            else -> null
        }
    }
}

@Document(indexName = "user")
data class User(
    @Id
    val id: UUID = UUID(0L, 0L),
    val username: String = "",
    val emailAddress: String = "",
    val password: String = "",
    val type: UserType? = null,
    var enabled: Boolean = false
)