package pt.isel.leic.ps.g42.Cri_Art.filters.auth
//
//import org.springframework.stereotype.Component
//import pt.isel.leic.ps.g42.Cri_Art.models.User
//import javax.servlet.Filter
//import javax.servlet.FilterChain
//import javax.servlet.ServletRequest
//import javax.servlet.ServletResponse
//import javax.servlet.http.HttpServletRequest
//import javax.servlet.http.HttpServletResponse
//
//@Component
//class AuthenticationFilter : Filter {
//
//    private final val CRI_ART_REALM_VALUE: String = "cri-art"
//
//    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
//        val httpRequest = request as HttpServletRequest
//
//        val authorizationHeader :String = httpRequest.getHeader("authorization")
//        val visitor = verifyBasicSchemeCredentials(authorizationHeader)
//        if (visitor != null) {
//            httpRequest.setAttribute("user-attributes", visitor)
//            chain?.doFilter(request, response)
//        }
//        else {
//            val httpResponse = response as HttpServletResponse
//            httpResponse.status = HttpServletResponse.SC_UNAUTHORIZED
//            httpResponse.addHeader("WWW-Authenticate", "Basic realm=\"${CRI_ART_REALM_VALUE}\"")
//        }
//    }
//
//    fun verifyBasicSchemeCredentials(challengeResponse :String) : User?{
//        val trimmedChallengeResponse = challengeResponse.trim()
//        return if (trimmedChallengeResponse.startsWith("Basic", ignoreCase = true)) {
//            val userCredentials = trimmedChallengeResponse.drop("Basic".length + 1).trim()
//            val (username, password) = decodeBase64(userCredentials)
//            authenticate(userService, username, password)
//        }
//        else null
//    }
//
//}