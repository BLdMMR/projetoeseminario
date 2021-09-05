package pt.isel.leic.ps.g42.criart.controllers.HomeController

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.services.HomeService
import pt.isel.leic.ps.g42.criart.services.UserService
import java.util.*
import kotlin.reflect.full.memberProperties

//@CrossOrigin(origins = ["http://localhost:3000"])
//@CrossOrigin("https://cri-art.herokuapp.com")
@CrossOrigin(origins = ["http://localhost:3000", "https://cri-art.herokuapp.com"])
@RestController
class HomeController (private val service: HomeService, private val userService: UserService){

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

    @GetMapping("/feed", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getFeed(@RequestAttribute user :User): ResponseEntity<List<FeedPost>> {
        var feed = service.getFeed(user.listOfFollows!!)
        println("FEED: ")
        println(feed)
        feed = feed.sortedByDescending { it.work.timestamp }
        return ResponseEntity.ok(feed)
    }

    @GetMapping("/public/tags")
    fun getAllTags() : ResponseEntity<List<String>> {
        val tags = service.getAllTags()
        return ResponseEntity<List<String>>(tags, HttpStatus.OK)
    }

    @GetMapping("/public/user-name")
    fun getUserName(@RequestParam userId :String): ResponseEntity<String> {
        val userName = userService.getUserName(UUID.fromString(userId))
        return ResponseEntity.ok(userName)
    }

}