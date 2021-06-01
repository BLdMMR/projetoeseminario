package pt.isel.leic.ps.g42.Cri_Art.storage

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.STORAGE_LOCATION
import pt.isel.leic.ps.g42.Cri_Art.models.Work
import pt.isel.leic.ps.g42.Cri_Art.models.WorkSaveModel
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IWorkRepository
import java.io.File
import java.nio.file.Path
import java.nio.file.attribute.FileAttribute
import java.util.*
import kotlin.io.path.createDirectory


@Component
class WorkRepository (private val es_repository : IWorkRepository){

    fun addWork(aid: UUID, work: Work) {

        val workToSave : WorkSaveModel = work.toSaveModel()

        val fileExtension = work.content?.contentType?.split("/")?.get(1)
        val dir = File(workToSave.filePath).mkdir()

        val file = File(workToSave.filePath, work.work_name + ".${fileExtension}").writeBytes((work.content?.bytes ?: ByteArray(0)))

        es_repository.save(workToSave)
    }

}

