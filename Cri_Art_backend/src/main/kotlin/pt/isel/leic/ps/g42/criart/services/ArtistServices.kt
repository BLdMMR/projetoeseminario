package pt.isel.leic.ps.g42.criart.services

import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.storage.ArtistRepository
import pt.isel.leic.ps.g42.criart.storage.irepositories.IUserRepository
import java.util.*

@Component
class ArtistServices(private val artistRepository: ArtistRepository, private val userRepository: IUserRepository) {

    fun createArtist(artist: Artist): Boolean {
        try {
            artistRepository.addArtist(artist)
            var user = userRepository.findByEmail(artist.email, Pageable.unpaged()).get().findFirst().get()
            user.hasProfile = true
            userRepository.deleteById(user.id)
            userRepository.save(user)
            return true
        } catch (e: Exception) {
            println("Artist Services Exception Catch: ${e.message}")
            e.printStackTrace()
            return false
        }
    }

    fun getArtistsByTag(tag: Tag): List<Artist> {
        return artistRepository.getAllArtistsByTag(tag)
    }


    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return artistRepository.getAllArtists()
    }

    fun addTagToArtist(artist_id : UUID, tag: String): Artist? {
        return artistRepository.addTagToArtist(artist_id, tag)
    }

    fun getSpecificArtist(id: UUID): Artist? {
        return artistRepository.getArtistById(id)
    }

    fun removeTagFromArtist(artistId: UUID, tag: Tag): Artist? {
        return artistRepository.removeTagFromArtist(artistId, tag)
    }



}


