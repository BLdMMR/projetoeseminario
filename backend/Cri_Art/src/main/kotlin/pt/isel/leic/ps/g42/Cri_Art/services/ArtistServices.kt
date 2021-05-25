package pt.isel.leic.ps.g42.Cri_Art.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.storage.ArtistRepository
import java.util.*

@Component
class ArtistServices(private val repository: ArtistRepository) {

    fun createArtist(artist: Artist): Artist {
        return repository.addArtist(artist)
    }

    fun getArtistsByTag(tag: Tag): List<Artist> {
        return repository.getAllArtistsByTag(tag)
    }


    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return repository.getAllArtists()
    }

    fun addTagToArtist(artist_id : UUID, tag: Tag): Artist? {
        return repository.addTagToArtist(artist_id, tag)
    }

    fun getSpecificArtist(id: UUID): Artist? {
        return repository.getArtistById(id)
    }

    fun removeTagFromArtist(artistId: UUID, tag: Tag): Artist? {
        return repository.removeTagFromArtist(artistId, tag)
    }

}
