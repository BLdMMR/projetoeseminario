package pt.isel.leic.ps.g42.criart.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import pt.isel.leic.ps.g42.criart.interceptors.LogInterceptor

@Configuration
@EnableWebMvc
class WebMvcConfig : WebMvcConfigurer {
    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(LogInterceptor())
    }

//    override fun addCorsMappings(registry: CorsRegistry) {
//        registry.addMapping("http://localhost:3000")
//        registry.addMapping("https://cri-art.herokuapp.com")
//    }
}