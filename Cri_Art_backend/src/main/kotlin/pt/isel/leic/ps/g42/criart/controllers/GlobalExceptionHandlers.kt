package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.*
import pt.isel.leic.ps.g42.criart.controllers.exceptions.EntityAlreadyExistsException
import java.lang.RuntimeException

/**
 * Partially complies with the "RFC 7807" standard
 */
data class ErrorResponseBody(val title: String, val status: Int, val detail: String)

@ControllerAdvice
class GlobalExceptionHandlers : ResponseEntityExceptionHandler() {

    @ExceptionHandler(value = [(Base64DecodeException::class)])
    fun handleBase64DecodeException(exception: Base64DecodeException, request: WebRequest): ResponseEntity<Any> {
        val title = "Error while decoding from Base64 format"

        return handleExceptionInternal(
            exception,
            ErrorResponseBody(title, HttpStatus.BAD_REQUEST.value(), exception.message!!),
            HttpHeaders(),
            HttpStatus.BAD_REQUEST,
            request
        )
    }


    @ExceptionHandler(value = [(EntityAlreadyExistsException::class)])
    fun handleEntityAlreadyExistsException(
        exception: EntityAlreadyExistsException,
        request: WebRequest
    ): ResponseEntity<Any> {

        return handleExceptionInternal(
            exception,
            ErrorResponseBody(exception.title, HttpStatus.CONFLICT.value(), exception.message!!),
            HttpHeaders(),
            HttpStatus.CONFLICT,
            request
        )
    }

    @ExceptionHandler(value = [(TokenNotFoundException::class)])
    fun handleResourceNotFoundException(exception: TokenNotFoundException, request: WebRequest): ResponseEntity<Any> {
        val title = "Table not found!"

        return handleExceptionInternal(
            exception,
            ErrorResponseBody(title, HttpStatus.NOT_FOUND.value(), exception.message!!),
            HttpHeaders(),
            HttpStatus.NOT_FOUND,
            request
        )
    }

    @ExceptionHandler(value = [(MalformedTokenException::class)])
    fun handleMalformedRequestException(exception: MalformedTokenException, request: WebRequest): ResponseEntity<Any> {
        val title = "The token doesn't respect the UUID standard!"

        return handleExceptionInternal(
            exception,
            ErrorResponseBody(title, HttpStatus.BAD_REQUEST.value(), exception.message!!),
            HttpHeaders(),
            HttpStatus.BAD_REQUEST,
            request
        )
    }

    @ExceptionHandler(value = [(LoginFailedException::class)])
    fun handleAuthenticationFailedException(exception: LoginFailedException, request: WebRequest): ResponseEntity<Any> {
        val title = "Failed to login!"

        return handleExceptionInternal(
            exception,
            ErrorResponseBody(title, HttpStatus.UNAUTHORIZED.value(), exception.message!!),
            HttpHeaders(),
            HttpStatus.UNAUTHORIZED,
            request
        )
    }

    @ExceptionHandler(value = [(SendEmailException::class)])
    fun handleEmailException(exception: SendEmailException, request: WebRequest): ResponseEntity<Any> {
        val title = "Failed to send email!"

        return handleExceptionInternal(
            exception,
            ErrorResponseBody(title, HttpStatus.BAD_GATEWAY.value(), exception.message!!),
            HttpHeaders(),
            HttpStatus.BAD_GATEWAY,
            request
        )
    }

}