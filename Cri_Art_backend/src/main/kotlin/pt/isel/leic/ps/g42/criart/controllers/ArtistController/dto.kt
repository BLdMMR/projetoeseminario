package pt.isel.leic.ps.g42.criart.controllers.ArtistController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.criart.models.Artist
import java.util.*

class ArtistInputModel @JsonCreator constructor(
        private val username :String,
        private val description :String,
        private val tags: List<String>
) {

    fun toArtist(id: UUID):Artist{
        return Artist(username, description, id)
    }
}

class ArtistOutputModel (
        val username: String,
        val description: String,
        val id: String,
        val reviews: Float,
        val tags: List<String>
)

