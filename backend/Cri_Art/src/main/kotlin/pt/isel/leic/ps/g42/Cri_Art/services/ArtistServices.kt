package pt.isel.leic.ps.g42.Cri_Art.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.storage.ArtistRepository

@Component
class ArtistServices(private val repository: ArtistRepository) {

    fun createArtist(artist: Artist): Boolean{
        return repository.addArtist(artist)
    }

    fun getArtistsByTag(tag: Tag): List<Artist> {
        return repository.getAllArtistsByTag(tag)
    }


    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return repository.getAllArtists()
    }

}
