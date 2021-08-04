package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.services.HomeService

//@CrossOrigin(origins = ["http://localhost:3000"])
//@CrossOrigin("https://cri-art.herokuapp.com")
@CrossOrigin(origins = ["http://localhost:3000", "https://cri-art.herokuapp.com"])
@RestController
class HomeController (private val service: HomeService){

    @GetMapping("public/home/search")
    fun searchByName(@RequestParam nameToSearchBy: String, @RequestAttribute user: User?): HomeService.Searchlist {
        println(nameToSearchBy)
        return service.searchByName(nameToSearchBy);
    }

    @GetMapping("public/home/tags")
    fun searchByTag(@RequestParam tagToSearchBy: String): HomeService.Searchlist {
        val tag = tagToSearchBy.replace('-', ' ')
        return service.searchByTag(Tag(tag))
    }

    @GetMapping("/feed")
    fun getFeed(@RequestAttribute user :User) {

    }

    @GetMapping("/public/tags")
    fun getAllTags() : ResponseEntity<List<String>> {
        val tags =service.getAllTags()
        return ResponseEntity<List<String>>(tags, HttpStatus.OK)
    }

}