package pt.isel.leic.ps.g42.Cri_Art.storage

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.util.*

@Component
class ArtistRepository {
    private val first_repo = LinkedList<Artist>()

    private val client: HttpClient = HttpClient.newHttpClient()


    fun addArtist(artist: Artist): Boolean {
        return first_repo.add(artist)
    }

    fun getAllArtistsByTag(tag :Tag): List<Artist> {
        return first_repo.filter { it.tags?.contains(tag) ?: false }
    }

    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return first_repo;
    }

    fun addTagToArtist(artist_id: UUID, tag: Tag): Artist? {
        val artist : Artist? = getArtistById(artist_id)
        val indexOf :Int = first_repo.indexOf(artist)
        if (artist != null) {
            if(artist.tags == null) artist.tags = LinkedList<Tag>()
            artist.tags!!.add(tag)
            first_repo.set(indexOf, artist)
        }
        return artist
    }

    fun getArtistById(id: UUID): Artist? {
        return first_repo.find { it.artist_id == id }
    }

    fun removeTagFromArtist(artistId: UUID, tag: Tag): Artist? {
        val artist = getArtistById(artistId)
        val indexOf :Int = first_repo.indexOf(artist)
        if (artist?.tags != null && !artist.tags!!.isEmpty()) {
            artist.tags!!.remove(tag)
            first_repo.set(indexOf, artist)
        }
        return artist

    }

}