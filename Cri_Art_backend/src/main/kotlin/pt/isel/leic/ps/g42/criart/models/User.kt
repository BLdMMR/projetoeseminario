package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

enum class UserType {
    ARTIST,
    CLIENT,
    MODERATOR;
    fun parse(type: String) : UserType? {
        when(type){
            "CLIENT" -> return CLIENT
            "ARTIST" -> return ARTIST
            "MODERATOR" -> return MODERATOR
            else -> return null
        }
    }
}

@Document(indexName = "user")
data class User(
    @Id
    val id: UUID = UUID(0L, 0L),
    val name: String = "",
    val emailAddress: String = "",
    val password: String = "",
    val type: UserType,
    val hasProfile: Boolean = false,
    val listOfFollows: List<Artist> = emptyList(),
    var enabled: Boolean = false
)