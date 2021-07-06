package pt.isel.leic.ps.g42.criart.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document
import pt.isel.leic.ps.g42.criart.controllers.ArtistController.ArtistOutputModel
import java.util.*

@Document(indexName = "artist")
data class Artist(
    val username: String,
    val description: String,
    @Id
    val artist_id: UUID = UUID.randomUUID(),
    val reviews: Float = 0.0f,
    var tags: LinkedList<String> = LinkedList()
) {
    constructor() : this("", "", UUID(0L, 0L))

    fun toOutputModel(): ArtistOutputModel {
        val stringTags : LinkedList<String> = LinkedList()
        tags.forEach {  stringTags.add(it)}
        return ArtistOutputModel(
                username,
                description,
                artist_id.toString(),
                reviews,
                stringTags
        )
    }
}
