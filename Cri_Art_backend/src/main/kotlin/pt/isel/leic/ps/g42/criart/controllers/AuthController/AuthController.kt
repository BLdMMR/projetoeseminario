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

//@CrossOrigin("http://localhost:3000")
//@CrossOrigin("https://cri-art.herokuapp.com")
@CrossOrigin(origins = ["http://localhost:3000", "https://cri-art.herokuapp.com"])
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
        var token :UUID? = null
        try{
             token = this.authService.loginUser(loginRequest.email, loginRequest.password)
            println(token)
        } catch (exception: Exception) {
            println("${exception.message} - ${exception.javaClass.name}")
        }
        if (token == null) return ResponseEntity(LoginResponse(token), HttpStatus.NOT_FOUND)
        return ResponseEntity(LoginResponse(token), HttpStatus.CREATED)
    }

    @DeleteMapping("/logout")
    fun logout(@RequestParam token: String): ResponseEntity<Any> {
        this.authService.logoutUser(token)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/signup",
        consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun signup(@RequestBody signupRequest: SignupRequest): ResponseEntity<Any> {
        this.authService.signupUser(signupRequest.name, signupRequest.email, signupRequest.password, signupRequest.userType)

        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/confirm-signup")
    fun confirmSignup(@RequestParam token: String): ResponseEntity<Any> {

        return if (authService.confirmSignup(token))
                    ResponseEntity(HttpStatus.OK)
            else ResponseEntity(HttpStatus.UNAUTHORIZED)
    }

    data class SignUpResponse(val message: String)

}