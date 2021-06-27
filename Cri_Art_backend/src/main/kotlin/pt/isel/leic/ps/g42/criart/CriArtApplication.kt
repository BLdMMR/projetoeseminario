package pt.isel.leic.ps.g42.criart

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling


@SpringBootApplication
/*
Scheduling is used to keep the deployments alive,
keeping them from shutting down for inactivity
 */
@EnableScheduling
class CriArtApplication

fun main(args: Array<String>) {
	runApplication<CriArtApplication>(*args)
}
