package pt.isel.leic.ps.g42.Cri_Art.models

import org.springframework.data.elasticsearch.annotations.Document
import org.springframework.web.multipart.MultipartFile
import pt.isel.leic.ps.g42.Cri_Art.STORAGE_LOCATION
import pt.isel.leic.ps.g42.Cri_Art.storage.WorkRepository
import java.io.File
import java.util.*

class Work(
        val id: UUID = UUID.randomUUID(),
        val work_name: String,
        val content: MultipartFile?,
        val owner: UUID,
        val description: String?,
        val reviews: Float = 0.0f,
        val tags: List<Tag>? = listOf(Tag())
) {
        constructor(ownerId :UUID) : this(UUID(0L, 0L), "",null, ownerId, "", 0.0f)

        fun toSaveModel() : WorkSaveModel = WorkSaveModel(
                id = id,
                work_name = work_name,
                description = description,
                owner = owner,
                reviews = reviews,
                tags = tags,
                content = content?.bytes,
                fileExtension = content?.originalFilename!!.split('.')[1]
        )
}

@Document(indexName = "works")
data class WorkSaveModel(
        val id: UUID,
        val work_name: String,
        val owner: UUID,
        val description: String?,
        val reviews: Float = 0.0f,
        val tags: List<Tag>? = listOf(Tag()),
        val content: ByteArray? = ByteArray(0),
        val fileExtension: String? = "",
        var comments: List<String>? = emptyList()
) {

}