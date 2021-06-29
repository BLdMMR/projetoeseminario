package pt.isel.leic.ps.g42.criart

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling


@SpringBootApplication
class CriArtApplication

fun main(args: Array<String>) {
	runApplication<CriArtApplication>(*args)
}
