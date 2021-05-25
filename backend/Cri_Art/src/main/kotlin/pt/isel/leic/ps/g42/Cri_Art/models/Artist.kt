package pt.isel.leic.ps.g42.Cri_Art.models

import java.util.*

data class Artist (
    val username: String,
    val email: String,
    val description: String,
    val artist_id: UUID = UUID.randomUUID(),
    val reviews: Float? = null,
    var tags: LinkedList<Tag>? = null,
    val works: LinkedList<Work>? = null
) {
}
