package pt.isel.leic.ps.g42.Cri_Art.models

import java.util.*

class Work constructor(
        val work_id: UUID = UUID.randomUUID(),
        val work_name: String,
        val owner: UUID,
        val description: String,
        val reviews: Float?,
        val tags: List<Tag>?,
)
