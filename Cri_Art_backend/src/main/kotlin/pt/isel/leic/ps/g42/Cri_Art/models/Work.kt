package pt.isel.leic.ps.g42.Cri_Art.models

import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.util.*

class Work(
        val work_id: UUID = UUID.randomUUID(),
        val work_name: String,
        val content: MultipartFile?,
        val owner: UUID,
        val description: String?,
        val reviews: Float = 0.0f,
        val tags: List<Tag>? = listOf(Tag()),
        val workFile: File? = null
) {
        constructor(ownerId :UUID) : this(UUID(0L, 0L), "",null, ownerId, "", 0.0f)
}
