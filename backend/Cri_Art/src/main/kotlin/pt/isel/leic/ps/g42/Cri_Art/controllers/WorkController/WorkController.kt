package pt.isel.leic.ps.g42.Cri_Art.controllers.WorkController

import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("arrtist/{aid}/worksofart")
class WorkController {

    @GetMapping
    fun getAllWorks(@PathVariable("aid") artist_id: String) {

    }

    /**
     *Questions for the input to be an image since the data input probably is or will be JSON
     * **/
//    @PostMapping
//    fun addWork(@PathVariable("aid"), workInput :WorkInputModel) {
//
//    }

    @GetMapping("/{wid}")
    fun getSpecificWork(@PathVariable("aid") artist_id: String, @PathVariable("wid") work_id: String) {

    }


}