package pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController.model.LoginRequest
import pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController.model.LoginResponse
import pt.isel.leic.ps.g42.Cri_Art.controllers.AuthController.model.SignupRequest
import pt.isel.leic.ps.g42.Cri_Art.services.auth.AuthService
import java.lang.IllegalArgumentException
import java.util.*
import org.springframework.http.ResponseEntity as ResponseEntity

@CrossOrigin(origins = ["http://localhost:3000", "https://cri-art.herokuapp.com"], maxAge = 3600)
@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService
) {

    val log = LoggerFactory.getLogger("Auth Controller")

    @PostMapping("/login",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE])
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<LoginResponse> {
        log.info("Login Request: $loginRequest")
        print("banana")
        val token = this.authService.loginUser(loginRequest.email, loginRequest.password)
        return ResponseEntity(LoginResponse(token), HttpStatus.CREATED)
    }

    @DeleteMapping("/logout")
    fun logout(@RequestParam token: String) {
        try {
            val formattedToken = UUID.fromString(token)
            this.authService.logoutUser(formattedToken)
        } catch (exception: IllegalArgumentException) {
            //TODO error in case the given token does not respect UUID format
        }
    }

    @PostMapping("/signup",
        consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun signup(@RequestBody signupRequest: SignupRequest): ResponseEntity<String> {
        this.authService.registerNewUser(signupRequest.name, signupRequest.email, signupRequest.password)
        return ResponseEntity("New user created successfully!", HttpStatus.CREATED)
    }

}