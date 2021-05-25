package pt.isel.leic.ps.g42.Cri_Art.controllers

import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchRepositoriesAutoConfiguration
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientProperties
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pt.isel.leic.ps.g42.Cri_Art.services.HomeServices


@RestController
@RequestMapping("/")
class HomeController (private val services : HomeServices) {

    @GetMapping
    fun getHomePage(): ResponseEntity<String> {

        return ResponseEntity
                .status(200)
                .body("Welcome to the homepage!")
    }


}