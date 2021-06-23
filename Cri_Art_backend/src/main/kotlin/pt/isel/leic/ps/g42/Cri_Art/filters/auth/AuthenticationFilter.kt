package pt.isel.leic.ps.g42.Cri_Art.filters.auth

import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import pt.isel.leic.ps.g42.Cri_Art.services.auth.AuthService
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.ITokenRepository
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AuthenticationFilter(private val authService: AuthService) : OncePerRequestFilter() {

    private val log = java.util.logging.Logger.getLogger(AuthenticationFilter::class.java.name)

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        this.log.info("REQUEST: ${request.method} ${request.requestURI}")
        val tokenParam: String? = request.getParameter("token")
        this.log.info("TOKEN: $tokenParam")

        val token: UUID
        try {
            token = UUID.fromString(tokenParam)
        } catch (e: Exception) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
            return
        }

        val user = this.authService.getLoggedInUser(token)

        if (user != null) {
            request.setAttribute("user", user)
            chain.doFilter(request, response)
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
        }
    }

    /**
     * Validate if starts with "/api/auth/" or "/api/public/"
     */
    private val filterExclusionUriMatcher = Regex("^(\\/api\\/auth\\/|\\/api\\/public\\/)")

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        return request.requestURI.contains(this.filterExclusionUriMatcher)
    }

    @Bean
    fun authFilterBean(): FilterRegistrationBean<AuthenticationFilter> {
        val regBean = FilterRegistrationBean<AuthenticationFilter>()
        regBean.filter = this
        return regBean
    }

}


