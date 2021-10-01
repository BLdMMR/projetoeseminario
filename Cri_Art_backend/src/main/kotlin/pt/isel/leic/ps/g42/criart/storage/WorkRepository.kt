package pt.isel.leic.ps.g42.criart.storage

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.models.Comment
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.Work
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import pt.isel.leic.ps.g42.criart.storage.irepositories.IWorkRepository
import java.sql.Timestamp
import java.util.*
import kotlin.NoSuchElementException


@Component
class WorkRepository (private val es_repository : IWorkRepository){

    val log = LoggerFactory.getLogger(this::class.simpleName)

    fun addWork(aid: UUID, work: Work) {

        val workToSave : WorkSaveModel = work.toSaveModel()

        es_repository.save(workToSave)
    }

    fun getAllWorks(aid: UUID): List<WorkSaveModel> {
        return es_repository.findAll().filter { it.owner.equals(aid) }
    }

    fun getWorksFromLastWeek(aid: UUID): List<WorkSaveModel> {
        return getAllWorks(aid).filter {  System.currentTimeMillis() - 604800000 < it.timestamp }
    }

    fun addComment(work_id: UUID, comment: String, username: String, id: UUID): WorkSaveModel {
        var work = es_repository.findById(work_id).get()
        work.comments = work.comments?.plus(Comment(comment, id, username, work_id))
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

    fun upvoteAndDownvote(workId: UUID, id: UUID): Boolean {
        var work = es_repository.findById(workId).get()
        val ups = LinkedList(work.ups)
        if(ups.indexOf(id) == -1) {
            ups.add(id)
        } else {
            ups.remove(id)
        }
        work.ups = ups
        es_repository.deleteById(workId)
        es_repository.save(work)
        return true
    }

    fun getWork(workId: UUID): WorkSaveModel? {
         if (es_repository.findById(workId).isEmpty) {
             return null
         }
         return es_repository.findById(workId).get()
    }

    fun deleteWork(workId: UUID): Boolean {
        es_repository.deleteById(workId)
        println(getWork(workId))
        if (getWork(workId) != null) {
            log.info("Removed")
            return true
        }
        return false
    }

}

