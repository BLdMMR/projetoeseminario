package pt.isel.leic.ps.g42.criart.controllers.ArtistController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.criart.models.Artist
import java.util.*

class ArtistInputModel @JsonCreator constructor(
        val username :String,
        val description :String,
        val tags: List<String>
) {

    fun toArtist(id: UUID):Artist{
        return Artist(username, description, id, tags = LinkedList(tags))
    }
}

class ArtistOutputModel (
        val username: String,
        val description: String,
        val id: String,
        val reviews: Float,
        val tags: List<String>
)

