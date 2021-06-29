package pt.isel.leic.ps.g42.criart.storage

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.Work
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import pt.isel.leic.ps.g42.criart.storage.irepositories.IWorkRepository
import java.util.*


@Component
class WorkRepository (private val es_repository : IWorkRepository){

    fun addWork(aid: UUID, work: Work) {

        val workToSave : WorkSaveModel = work.toSaveModel()

        es_repository.save(workToSave)
    }

    fun getAllWorks(aid: UUID): List<WorkSaveModel> {
        return es_repository.findAll().filter { it.owner.equals(aid) }
    }

    fun addComment(work_id: UUID, comment: String): WorkSaveModel {
        var work = es_repository.findById(work_id).get()
        work.comments = work.comments?.plus(comment)
        es_repository.deleteById(work_id)
        es_repository.save(work)
        return work
    }

    fun searchWork(nameToSearchBy: String): List<WorkSaveModel> {
        val all = es_repository.findAll()
        return all.filter { it.work_name == nameToSearchBy || it.work_name.contains(nameToSearchBy) || it.description!!.contains(nameToSearchBy) }
    }

    fun getAllWorksByTag(tag: Tag): List<WorkSaveModel> {
        val all = es_repository.findAll()
        return all.filter { it.tags!!.contains(tag) }
    }

}
