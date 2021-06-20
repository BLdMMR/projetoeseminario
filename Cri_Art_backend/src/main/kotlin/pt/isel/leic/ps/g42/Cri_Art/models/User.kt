package pt.isel.leic.ps.g42.Cri_Art.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

@Document(indexName = "user")
data class User(
    @Id
    val id: UUID = UUID(0L, 0L),
    val name: String = "",
    val emailAddress: String = "",
    val password: String = ""
)