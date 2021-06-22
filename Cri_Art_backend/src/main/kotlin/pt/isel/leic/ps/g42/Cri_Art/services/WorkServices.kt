package pt.isel.leic.ps.g42.Cri_Art.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Work
import pt.isel.leic.ps.g42.Cri_Art.models.WorkSaveModel
import pt.isel.leic.ps.g42.Cri_Art.storage.WorkRepository
import java.util.*


@Component
class WorkServices (private val repository : WorkRepository){
    fun addWork(aid: UUID, work: Work) {
        repository.addWork(aid, work)
    }

    fun getAllWorks(aid: UUID): List<WorkSaveModel> {
        return repository.getAllWorks(aid)
    }

    fun addCommentToWork(work_id: UUID, comment: String): WorkSaveModel {
        return repository.addComment(work_id, comment)
    }
}
