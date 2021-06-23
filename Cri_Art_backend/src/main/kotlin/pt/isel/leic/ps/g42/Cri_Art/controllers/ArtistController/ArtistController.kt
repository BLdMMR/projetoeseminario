package pt.isel.leic.ps.g42.Cri_Art.controllers.ArtistController

import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.models.User
import pt.isel.leic.ps.g42.Cri_Art.models.UserType
import pt.isel.leic.ps.g42.Cri_Art.services.ArtistServices
import java.util.*


@RestController
@RequestMapping("/artist", "/api/artist")
class ArtistController (private val services : ArtistServices){

    @GetMapping("/{aid}")
    fun getSpecificArtist(@PathVariable("aid") artist_id :String): Artist? {
        return services.getSpecificArtist(UUID.fromString(artist_id))
    }

    @GetMapping("/tag")
    fun searchArtistByTag(@RequestParam tagToSearchBy: String): List<Artist> {
        val tag = Tag(tagToSearchBy)
        return services.getArtistsByTag(tag);
    }

    @PostMapping
    fun createArtist(@RequestBody artistIM: ArtistInputModel, @RequestAttribute user :User): Artist {
        val artist = artistIM.toArtist(user.id)
        return services.createArtist(artist)
    }

    @GetMapping //DEBUG
    fun getAllArtists(@RequestAttribute user : User): List<Artist> {
        if (user.type != UserType.MODERATOR) return emptyList()
        return services.getAllArtists()
    }
}