package pt.isel.leic.ps.g42.Cri_Art.controllers.ArtistController

import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.services.ArtistServices


@RestController
@RequestMapping("/artist")
class ArtistController (private val services : ArtistServices){

    @GetMapping("/{aid}")
    fun getSpecificArtist(@PathVariable("aid") artist_id :String) {
        throw NotImplementedError()
    }

    @GetMapping
    fun searchArtistOnTag(@RequestParam tagToSearchBy: String): List<Artist> {
        val tag = Tag(tagToSearchBy)
        return services.getArtistsByTag(tag);
    }

    @PostMapping
    fun createArtist(@RequestBody artistIM: ArtistInputModel): Boolean {
        val artist = artistIM.toArtist()
        return services.createArtist(artist)
    }

    @GetMapping("/debug")
    fun getAllArtists(): List<Artist> {
        return services.getAllArtists()
    }




}