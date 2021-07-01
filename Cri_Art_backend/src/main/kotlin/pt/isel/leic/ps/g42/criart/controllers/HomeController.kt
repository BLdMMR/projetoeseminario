package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.services.HomeServices

@CrossOrigin(origins = ["http://localhost:3000"])
//@CrossOrigin("https://cri-art.herokuapp.com")
//@CrossOrigin(origins = ["http://localhost:3000", "https://cri-art.herokuapp.com"])
@RestController
class HomeController (private val services: HomeServices){

    @GetMapping("public/home/search")
    fun searchByName(@RequestParam nameToSearchBy: String, @RequestAttribute user: User?): HomeServices.Searchlist {
        println(nameToSearchBy)
        return services.searchByName(nameToSearchBy);
    }

    @GetMapping("public/home/tags")
    fun searchByTag(@RequestParam tagToSearchBy: String): HomeServices.Searchlist {
        val tag = tagToSearchBy.replace('-', ' ')
        return services.searchByTag(Tag(tag))
    }

    @GetMapping("/home")
    fun getFeed(@RequestAttribute user :User) {

    }

    @GetMapping("/public/tags")
    fun getAllTags() : ResponseEntity<List<String>> {
        val tags =services.getAllTags()
        return ResponseEntity<List<String>>(tags, HttpStatus.OK)
    }

}