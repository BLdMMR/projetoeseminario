package pt.isel.leic.ps.g42.Cri_Art.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


//@Configuration
//@EnableWebSecurity
//class WebSecurityConfig : WebSecurityConfigurerAdapter() {
//
//    override fun configure(http: HttpSecurity) {
//        http.cors().and().csrf()
//                .disable()
//            .authorizeRequests()
//            .antMatchers("/api/auth/*")
//            .permitAll()
//            .anyRequest()
//            .authenticated()
//    }
//
//}
//
