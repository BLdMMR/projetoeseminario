package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

enum class TokenType {
    LOGIN,
    SIGNUP
}

@Document(indexName = "token")
data class Token constructor(
    val userId: UUID?,
    @Id
    val token: UUID?,
    val type: TokenType?
)