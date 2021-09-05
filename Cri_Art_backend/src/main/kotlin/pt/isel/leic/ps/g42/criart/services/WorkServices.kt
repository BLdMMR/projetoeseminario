package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.models.Work
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import pt.isel.leic.ps.g42.criart.storage.WorkRepository
import java.util.*


@Component
class WorkServices (private val repository : WorkRepository){
    fun addWork(aid: UUID, work: Work) {
        repository.addWork(aid, work)
    }

    fun getAllWorks(aid: UUID): List<WorkSaveModel> {
        return repository.getAllWorks(aid)
    }

    fun addCommentToWork(work_id: UUID, comment: String,username: String, id: UUID): WorkSaveModel {
        return repository.addComment(work_id, comment, username, id)
    }

    fun upvoteAndDownvote(work_id: UUID?, id: UUID): Boolean {
        return repository.upvoteAndDownvote(work_id!!, id)
    }
}
