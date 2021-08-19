package pt.isel.leic.ps.g42.criart.controllers.HomeController

import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import java.time.Instant
import java.time.LocalDateTime
import java.util.*

data class Feed(
    public val pubList : List<FeedPost>
)

data class FeedPost(
    val work: WorkFeedModel,
    val artist_id: UUID,
    val artist_name: String
)

data class WorkFeedModel(
    val id: UUID,
    val work_name: String,
    val description: String?,
    val content: ByteArray? = ByteArray(0),
    val fileExtension: String? = "",
    val timestamp: Long,
    val ups: List<UUID>
)