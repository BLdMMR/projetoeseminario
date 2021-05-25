package pt.isel.leic.ps.g42.Cri_Art.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Work
import pt.isel.leic.ps.g42.Cri_Art.storage.WorkRepository
import java.util.*

@Component
class WorkServices (private val repository : WorkRepository){
    fun addWork(aid: UUID, toWork: Work) {

    }

}
