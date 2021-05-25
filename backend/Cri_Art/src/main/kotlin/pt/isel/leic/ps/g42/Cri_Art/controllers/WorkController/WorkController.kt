package pt.isel.leic.ps.g42.Cri_Art.controllers.WorkController

import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.*
import pt.isel.leic.ps.g42.Cri_Art.services.WorkServices
import java.io.File
import java.util.*


@RestController
@RequestMapping("arrtist/{aid}/worksofart")
class WorkController (private val services : WorkServices){

    val log = LoggerFactory.getLogger("WorkControllerLogger")

    @GetMapping
    fun getAllWorks(@PathVariable("aid") artist_id: String) {

    }

    @PostMapping
    fun addWork(@PathVariable("aid") artist_id :String, workInput :WorkInputModel) {
        val aid = UUID.fromString(artist_id)
        services.addWork(aid, workInput.toWork(aid))
        val fileExtension = workInput.content.contentType?.split("/")?.get(1)
        log.info("fileExtension: $fileExtension")
        val file = File("", workInput.name + ".${fileExtension}").writeBytes(workInput.content.bytes)

        log.info("Work Saved")
    }

    @GetMapping("/{wid}")
    fun getSpecificWork(@PathVariable("aid") artist_id: String, @PathVariable("wid") work_id: String) {

    }


}