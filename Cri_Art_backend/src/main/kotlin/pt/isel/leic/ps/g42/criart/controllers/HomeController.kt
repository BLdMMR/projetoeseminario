package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.services.HomeServices

@CrossOrigin("http://localhost:3000", "https://cri-art.herokuapp.com")
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
}