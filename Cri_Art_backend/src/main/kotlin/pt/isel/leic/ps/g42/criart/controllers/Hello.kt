package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class Hello {

    @GetMapping("/public/hello")
    fun helloWorld(): String {
        return "hello world!"
    }
}