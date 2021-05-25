package pt.isel.leic.ps.g42.Cri_Art.controllers.ArtistController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.Cri_Art.models.Artist

class ArtistInputModel @JsonCreator constructor(
        private val username :String,
        private val description :String,
        private val email :String,
) {

    fun toArtist() :Artist{
        return Artist(username, email, description)
    }
}

