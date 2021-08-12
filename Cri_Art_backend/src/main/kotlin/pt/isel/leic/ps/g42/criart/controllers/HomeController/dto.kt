package pt.isel.leic.ps.g42.criart.controllers.HomeController

import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import java.util.*

data class Feed(
    public val pubList : List<FeedPost>
)

data class FeedPost(
    private val work: WorkFeedModel,
    private val artist_id: UUID,
    private val artist_name: String
)

data class WorkFeedModel(
    val id: UUID,
    val work_name: String,
    val description: String?,
    val content: ByteArray? = ByteArray(0),
    val fileExtension: String? = "",
)