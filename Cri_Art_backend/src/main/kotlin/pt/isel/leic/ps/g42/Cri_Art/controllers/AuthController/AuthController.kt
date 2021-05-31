package pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController {

    @PostMapping("/signin")
    fun signin() {

    }

    @DeleteMapping("/signout")
    fun signout() {

    }

    @PostMapping("/register")
    fun register() {

    }

    @GetMapping("/recover")
    fun recover() {

    }
}