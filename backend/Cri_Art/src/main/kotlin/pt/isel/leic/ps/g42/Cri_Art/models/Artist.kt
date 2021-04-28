package pt.isel.leic.ps.g42.Cri_Art.models

import java.util.*


class Artist (
        val username: String,
        val email: String,
        val description: String,
        val artist_id: UUID = UUID.randomUUID(),
        val reviews: Float? = null,
        val tags: List<Tag>? = null,
        val works: List<Work>? = null
) {
}
