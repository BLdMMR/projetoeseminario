package pt.isel.leic.ps.g42.Cri_Art.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

enum class TokenType {
    SIGNIN,
    SIGNUP
}

@Document(indexName = "token")
data class Token constructor(
    val userId: UUID = UUID(0L, 0L),
    @Id
    val token: UUID = UUID(0L, 0L),
    val tokenType: TokenType? = null
)