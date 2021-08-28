package pt.isel.leic.ps.g42.criart.interceptors

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.ModelAndView
import javax.servlet.ServletInputStream
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class LogInterceptor : HandlerInterceptor {

    private val log = LoggerFactory.getLogger(this::class.java.name)

    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        log.info("[REQUEST] ${request.method} ${request.requestURL}")
        return true
    }

    override fun postHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any, modelAndView: ModelAndView?) {
        log.info("[RESPONSE] Status: ${response.status} to the [REQUEST] ${request.method} ${request.requestURL}")
        log.info("[RESPONSE] Headers: ${response.headerNames}")
    }
}

