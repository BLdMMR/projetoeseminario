package pt.isel.leic.ps.g42.criart.controllers.ArtistTagController

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.models.UserType
import pt.isel.leic.ps.g42.criart.services.ArtistServices
import java.util.*

@RestController
@RequestMapping("/artist/{aid}/tag")
class ArtistTagController(private val services :ArtistServices) {

    @PatchMapping
    fun addTagToArtist(@PathVariable("aid") artist_id: String, @RequestBody addTaginput :TagInputModel, @RequestAttribute user : User): Artist? {
        if (user.type != UserType.ARTIST) return null
        val tag = addTaginput.toTag()
        return services.addTagToArtist(UUID.fromString(artist_id), tag)
    }

    @PatchMapping("/{tag}")
    fun removeTagFromArtist(@PathVariable("aid") artist_id: String, @PathVariable("tag") tagToRemove: String, @RequestAttribute user: User): Artist? {
        if (user.type != UserType.ARTIST) return null
        val tag = Tag(tagToRemove)
        return services.removeTagFromArtist(UUID.fromString(artist_id), tag)
    }



}
