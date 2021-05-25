package pt.isel.leic.ps.g42.Cri_Art.controllers.ArtistTagController

import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.services.ArtistServices
import java.util.*

@RestController
@RequestMapping("/artist/{aid}/tags")
class ArtistTagController(private val services :ArtistServices) {

    @PatchMapping
    fun addTagToArtist(@PathVariable("aid") artist_id: String, @RequestBody addTaginput :TagInputModel): Artist? {
        val tag = addTaginput.toTag()
        return services.addTagToArtist(UUID.fromString(artist_id), tag)
    }

    @PatchMapping("/{tag}")
    fun removeTagFromArtist(@PathVariable("aid") artist_id: String, @PathVariable("tag") tagToRemove: String): Artist? {
        val tag = Tag(tagToRemove)
        return services.removeTagFromArtist(UUID.fromString(artist_id), tag)
    }

}