package pt.isel.leic.ps.g42.Cri_Art.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import java.util.*

@Document(indexName = "cri_art_index")
data class Artist(
    val username: String,
    val email: String,
    val description: String,
    @Id
    val artist_id: UUID = UUID.randomUUID(),
    val reviews: Float = 0.0f,
    var tags: LinkedList<Tag> = LinkedList(),
    val works: LinkedList<Work> = LinkedList()
) {
    constructor() : this("", "", "", UUID(0L, 0L),)
}
