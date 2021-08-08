package pt.isel.leic.ps.g42.criart.controllers.ArtistController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.criart.models.Artist
import java.util.*

class ArtistInputModel @JsonCreator constructor(
        val description :String,
        val tags: List<String>
) {

    fun toArtist(id: UUID, email: String, username: String):Artist{
        val taglist = LinkedList<String>()
        tags.forEach{ taglist.add(it) }
        return Artist(username, description, email, id, tags = taglist)
    }
}

class ArtistOutputModel (
        val username: String,
        val description: String,
        val id: String,
        val reviews: Float,
        val tags: List<String>
)

