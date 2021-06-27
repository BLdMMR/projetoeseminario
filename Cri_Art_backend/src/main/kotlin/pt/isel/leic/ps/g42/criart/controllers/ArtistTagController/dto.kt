package pt.isel.leic.ps.g42.criart.controllers.ArtistTagController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.criart.models.Tag

class TagInputModel @JsonCreator constructor(
    val tagName: String
){
    fun toTag() : Tag {
        return Tag(tagName)
    }
}
