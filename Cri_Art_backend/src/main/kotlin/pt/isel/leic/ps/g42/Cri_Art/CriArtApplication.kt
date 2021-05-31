package pt.isel.leic.ps.g42.Cri_Art

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@SpringBootApplication
@EnableWebSecurity
class CriArtApplication

fun main(args: Array<String>) {
	runApplication<CriArtApplication>(*args)
}
