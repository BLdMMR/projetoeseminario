package pt.isel.leic.ps.g42.Cri_Art.storage

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import java.util.*

@Component
class ArtistRepository {
    private val first_repo = LinkedList<Artist>();



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


}