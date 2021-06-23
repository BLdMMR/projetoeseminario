package pt.isel.leic.ps.g42.Cri_Art.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.services.HomeServices

@RestController
@RequestMapping("/home")
class HomeController (private val services: HomeServices){

    @GetMapping("/search")
    fun searchByName(@RequestParam nameToSearchBy: String): HomeServices.Searchlist {
        return services.searchByName(nameToSearchBy);
    }

    @GetMapping("/tags")
    fun searchByTag(@RequestParam tagToSearchBy: String): HomeServices.Searchlist {
        val tag = tagToSearchBy.replace('-', ' ')
        return services.searchByTag(Tag(tag))
    }
}