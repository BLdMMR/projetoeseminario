package pt.isel.leic.ps.g42.criart.controllers.AuthController

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.HasProfile
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginRequest
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.LoginResponse
import pt.isel.leic.ps.g42.criart.controllers.AuthController.model.SignupRequest
import pt.isel.leic.ps.g42.criart.services.AuthService
import java.util.*
import java.util.logging.Logger
import org.springframework.http.ResponseEntity as ResponseEntity


@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService
) {

    private val log = Logger.getLogger(AuthController::class.java.name)

    @PostMapping(
        "/login",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<LoginResponse> {

        var token: UUID? = null
        var lgnRes :LoginResponse? = null
        try {
            lgnRes = this.authService.loginUser(loginRequest.email, loginRequest.password)
            this.log.info(token.toString())
        } catch (exception: Exception) {
            println("${exception.message} - ${exception.javaClass.name}")
        }
        if (lgnRes == null)
            return ResponseEntity(lgnRes, HttpStatus.NOT_FOUND)
        return ResponseEntity(lgnRes, HttpStatus.CREATED)
    }

    @DeleteMapping("/logout")
    fun logout(@RequestParam token: String): ResponseEntity<Boolean> {
        var status = false
        status = this.authService.logoutUser(token)

        if (status)
            return ResponseEntity(status, HttpStatus.OK)
        else
            return ResponseEntity(status, HttpStatus.BAD_REQUEST)
    }

    @PostMapping(
        "/signup",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun signup(@RequestBody signupRequest: SignupRequest): ResponseEntity<Any> {
        println("signupRequest")
        println(signupRequest.username)
        this.authService.signupUser(signupRequest.username, signupRequest.email, signupRequest.password, signupRequest.type)
        return ResponseEntity.ok(HttpStatus.OK)
    }

    @PostMapping(
        "/confirm-signup",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun confirmSignup(@RequestParam token: String): ResponseEntity<Any> {

        val user = authService.confirmSignup(token)
        return if (user == null) {
            ResponseEntity(HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
        } else {
            ResponseEntity.ok(HttpStatus.OK)
        }
    }

    @GetMapping("profile-info")
    fun hasProfile(@RequestParam token :String): ResponseEntity<HasProfile> {
        val hasProfile = authService.hasProfile(UUID.fromString(token))
        return ResponseEntity.ok(HasProfile(hasProfile!!))
    }



}