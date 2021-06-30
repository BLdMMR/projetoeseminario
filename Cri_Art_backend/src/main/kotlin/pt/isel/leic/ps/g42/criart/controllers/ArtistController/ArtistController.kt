package pt.isel.leic.ps.g42.criart.controllers.ArtistController

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.models.UserType
import pt.isel.leic.ps.g42.criart.services.ArtistServices
import java.util.*

@CrossOrigin("http://localhost:3000", "https://cri-art.herokuapp.com")
//@CrossOrigin(origins = ["http://localhost:3000", "https://cri-art.herokuapp.com"])
@RestController
@RequestMapping("/artist")
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

    @PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
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