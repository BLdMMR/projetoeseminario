package pt.isel.leic.ps.g42.Cri_Art.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Hello {

    @GetMapping("/hello")
    fun helloWorld(): String {
        return "hello world!"
    }
}