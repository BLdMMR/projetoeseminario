package pt.isel.leic.ps.g42.Cri_Art.controllers.WorkController

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("arrtist/{aid}/worksofart")
class WorkController {

    @GetMapping
    fun GetAllWorks(@PathVariable("aid") artist_id: String) {
        throw NotImplementedError()
    }

    @GetMapping("/{wid}")
    fun getSpecificWork(@PathVariable("wid") work_id: String) {

    }

}