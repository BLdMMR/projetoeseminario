package pt.isel.leic.ps.g42.criart.filters.cors

import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class CORSFilter : OncePerRequestFilter() {

    private val corsHeaders = "Access-Control-Allow-Headers, " +
            "Access-Control-Allow-Origin, " +
            "Origin,"  +
            "Accept, " +
            "X-Requested-With, " +
            "Content-Type, " +
            "Access-Control-Request-Method, " +
            "Access-Control-Request-Headers"

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {

        response.addHeader("Access-Control-Allow-Origin", "*")
        response.addHeader("Access-Control-Allow-Headers",  corsHeaders)
        response.addHeader("Access-Control-Allow-Credentials", "true")
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH")

        if (HttpMethod.OPTIONS.name == request.method) {
            response.status = HttpServletResponse.SC_OK
        } else {
            filterChain.doFilter(request, response)
        }
    }
}
