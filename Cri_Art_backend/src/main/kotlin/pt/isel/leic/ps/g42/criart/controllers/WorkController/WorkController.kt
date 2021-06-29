package pt.isel.leic.ps.g42.criart.controllers.WorkController

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.models.UserType
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import pt.isel.leic.ps.g42.criart.services.WorkServices
import java.util.*


@RestController
@RequestMapping("artist/{aid}/worksofart")
class WorkController (private val services : WorkServices){

    val log = LoggerFactory.getLogger("WorkControllerLogger")

    @GetMapping
    fun getAllWorks(@PathVariable("aid") artist_id: String) {

    }

    @PostMapping
    fun addWork(@PathVariable("aid") artist_id :String, workInput :WorkInputModel, @RequestAttribute user: User): ResponseEntity<String> {
        if (user.type != UserType.ARTIST) return ResponseEntity("Request only available to Artists", HttpStatus.FORBIDDEN)
        val aid = UUID.fromString(artist_id)

        services.addWork(aid, workInput.toWork(aid))

        log.info("Work Saved")
        return ResponseEntity("Work Added to Portfolio", HttpStatus.CREATED)
    }

    @GetMapping("/{wid}")
    fun getSpecificWork(@PathVariable("aid") artist_id: String, @PathVariable("wid") work_id: String) {

    }

    @PostMapping("/{wid}")
    fun addCommentToWork(@PathVariable("wid") work_id: String, @RequestBody comment: String, @RequestAttribute user: User): ResponseEntity<WorkSaveModel> {
        if (user.type != UserType.ARTIST && user.type != UserType.CLIENT)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null)
        val work = services
                .addCommentToWork(
                    UUID.fromString(work_id),
                    comment
                )
        return ResponseEntity.ok().body(work)
    }


}