package pt.isel.leic.ps.g42.criart.services

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.storage.ArtistRepository
import java.util.*

@Component
class ArtistServices(private val repository: ArtistRepository) {

    fun createArtist(artist: Artist): Boolean {
        return try {
            repository.addArtist(artist)
            true
        } catch (e: Exception) {
            println(e.message)
            false
        }
    }

    fun getArtistsByTag(tag: Tag): List<Artist> {
        return repository.getAllArtistsByTag(tag)
    }


    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return repository.getAllArtists()
    }

    fun addTagToArtist(artist_id : UUID, tag: String): Artist? {
        return repository.addTagToArtist(artist_id, tag)
    }

    fun getSpecificArtist(id: UUID): Artist? {
        return repository.getArtistById(id)
    }

    fun removeTagFromArtist(artistId: UUID, tag: Tag): Artist? {
        return repository.removeTagFromArtist(artistId, tag)
    }



}


