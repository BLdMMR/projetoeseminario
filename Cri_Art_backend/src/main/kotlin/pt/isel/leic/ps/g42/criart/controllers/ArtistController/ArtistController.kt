package pt.isel.leic.ps.g42.criart.controllers.ArtistController

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.models.UserType
import pt.isel.leic.ps.g42.criart.services.ArtistServices
import java.util.*
import kotlin.math.log


@RestController
@RequestMapping("/artist")
class ArtistController (private val services : ArtistServices){
    private val log = LoggerFactory.getLogger(this::class.java.name)

    @GetMapping("/{aid}")
    fun getSpecificArtist(@PathVariable("aid") artist_id :String): Artist? {
        return services.getSpecificArtist(UUID.fromString(artist_id))
    }

    @GetMapping("/tag")
    fun searchArtistByTag(@RequestParam tagToSearchBy: String): List<Artist> {
        val tag = Tag(tagToSearchBy)
        return services.getArtistsByTag(tag);
    }

    @PostMapping(
            consumes = [MediaType.APPLICATION_JSON_VALUE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun createArtist(@RequestBody artistIM: ArtistInputModel, @RequestAttribute user :User): ResponseEntity<Boolean> {
        log.info("Request from user ${user.name} to create an artist arrived the handler")
        log.info("${artistIM.description}\n${artistIM.tags}")
        val artist = artistIM.toArtist(user.id, user.emailAddress, user.name)
        println("Slam Banana")
        val status = services.createArtist(artist)
        return if (status) {
            println("Super Slam Banana")
            ResponseEntity(true, HttpStatus.OK)
        } else {
            ResponseEntity(false, HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping //DEBUG
    fun getAllArtists(@RequestAttribute user : User): List<Artist> {
        if (user.type != UserType.MODERATOR) return emptyList()
        return services.getAllArtists()
    }
}