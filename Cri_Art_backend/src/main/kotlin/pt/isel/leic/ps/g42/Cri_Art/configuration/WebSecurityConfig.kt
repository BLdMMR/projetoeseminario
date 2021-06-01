package pt.isel.leic.ps.g42.Cri_Art.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import pt.isel.leic.ps.g42.Cri_Art.services.auth.RegisteredUserDetailsService


@Configuration
@EnableWebSecurity
class WebSecurityConfig(
    private val registeredUserDetailsService: RegisteredUserDetailsService
) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http.cors()
            .and()
                .authorizeRequests()
                .antMatchers("/api")
                .permitAll()
                .anyRequest()
                .authenticated()
            //.and().oauth2ResourceServer { oauth -> oauth.jwt() }
    }

    override fun userDetailsService(): UserDetailsService = this.registeredUserDetailsService

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

}

