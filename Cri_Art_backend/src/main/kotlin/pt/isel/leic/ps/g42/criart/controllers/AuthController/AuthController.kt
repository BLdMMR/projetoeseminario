package pt.isel.leic.ps.g42.criart.controllers.AuthController

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
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

        var token: UUID?
        token = this.authService.loginUser(loginRequest.email, loginRequest.password)
        this.log.info(token.toString())

        return if (token == null)
            ResponseEntity(LoginResponse(token), HttpStatus.NOT_FOUND)
        else ResponseEntity(LoginResponse(token), HttpStatus.CREATED)

    }

    @DeleteMapping(
        "/logout",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun logout(@RequestParam token: String): ResponseEntity<Any> {
        this.authService.logoutUser(token)
        return ResponseEntity.ok(HttpStatus.OK)
    }

    @PostMapping(
        "/signup",
        consumes = [MediaType.APPLICATION_JSON_VALUE],
        produces = [MediaType.APPLICATION_JSON_VALUE]
    )
    fun signup(@RequestBody signupRequest: SignupRequest): ResponseEntity<Any> {
        this.authService.signupUser(signupRequest.username, signupRequest.email, signupRequest.password)

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

}