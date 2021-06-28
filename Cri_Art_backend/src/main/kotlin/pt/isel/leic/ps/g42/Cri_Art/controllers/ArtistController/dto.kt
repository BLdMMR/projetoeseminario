package pt.isel.leic.ps.g42.Cri_Art.controllers.ArtistController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import java.util.*

class ArtistInputModel @JsonCreator constructor(
        private val username :String,
        private val description :String,
        private val email :String,
        private val tags: List<String>
) {

    fun toArtist(id: UUID):Artist{
        return Artist(username, email, description, id)
    }
}

