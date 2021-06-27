package pt.isel.leic.ps.g42.criart.controllers.AuthController

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginRequest
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginResponse
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.SignupRequest
import pt.isel.leic.ps.g42.criart.services.AuthService
import java.util.logging.Logger
import org.springframework.http.ResponseEntity as ResponseEntity

@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService
) {

    private val log =  Logger.getLogger(AuthController::class.java.name)

    @PostMapping("/login",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE])
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<LoginResponse> {
        val token = this.authService.loginUser(loginRequest?.email, loginRequest?.password)
        return ResponseEntity(LoginResponse(token), HttpStatus.CREATED)
    }

    @DeleteMapping("/logout")
    fun logout(@RequestParam token: String): ResponseEntity<String> {
        this.authService.logoutUser(token)
        return ResponseEntity("User logged out successfully!", HttpStatus.OK)
    }

    @PostMapping("/signup",
        consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun signup(@RequestBody signupRequest: SignupRequest): ResponseEntity<String> {
        this.authService.signupUser(signupRequest.name, signupRequest.email, signupRequest.password)

        return ResponseEntity("New user created successfully!", HttpStatus.CREATED)
    }

}