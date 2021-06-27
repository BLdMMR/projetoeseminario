package pt.isel.leic.ps.g42.criart.controllers

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.Base64DecodeException
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.MalformedTokenException
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.TokenNotFoundException
import pt.isel.leic.ps.g42.criart.controllers.AuthController.exceptions.UserEmailAlreadyExistsException
import java.lang.RuntimeException


@ControllerAdvice
class GlobalExceptionHandlers: ResponseEntityExceptionHandler() {

    @ExceptionHandler(value = [(Base64DecodeException::class)])
    fun handleBase64DecodeException(exception: RuntimeException, request: WebRequest): ResponseEntity<Any> {

        return handleExceptionInternal(
            exception,
            exception.message,
            HttpHeaders(),
            HttpStatus.BAD_REQUEST,
            request
        )
    }


    @ExceptionHandler(value = [(UserEmailAlreadyExistsException::class)])
    fun handleEntityAlreadyExistsException(exception: RuntimeException, request: WebRequest): ResponseEntity<Any> {

        return handleExceptionInternal(
            exception,
            exception.message,
            HttpHeaders(),
            HttpStatus.CONFLICT,
            request
        )
    }

    @ExceptionHandler(value = [(TokenNotFoundException::class)])
    fun handleResourceNotFoundException(exception: RuntimeException, request: WebRequest): ResponseEntity<Any> {
        return handleExceptionInternal(
            exception,
            exception.message,
            HttpHeaders(),
            HttpStatus.NOT_FOUND,
            request
        )
    }

    @ExceptionHandler(value = [(MalformedTokenException::class)])
    fun handleMalformedRequestException(exception: RuntimeException, request: WebRequest): ResponseEntity<Any> {
        return handleExceptionInternal(
            exception,
            exception.message,
            HttpHeaders(),
            HttpStatus.BAD_REQUEST,
            request
        )
    }

}