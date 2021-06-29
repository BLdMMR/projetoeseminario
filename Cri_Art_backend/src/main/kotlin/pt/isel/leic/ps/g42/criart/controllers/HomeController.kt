package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.services.HomeServices

@RestController
@RequestMapping("/home")
class HomeController (private val services: HomeServices){

    @GetMapping("/search")
    fun searchByName(@RequestParam nameToSearchBy: String): HomeServices.Searchlist {
        println(nameToSearchBy)
        return services.searchByName(nameToSearchBy);
    }

    @GetMapping("/tags")
    fun searchByTag(@RequestParam tagToSearchBy: String): HomeServices.Searchlist {
        val tag = tagToSearchBy.replace('-', ' ')
        return services.searchByTag(Tag(tag))
    }

    @GetMapping
    fun getFeed(@RequestParam token: String) {

    }
}