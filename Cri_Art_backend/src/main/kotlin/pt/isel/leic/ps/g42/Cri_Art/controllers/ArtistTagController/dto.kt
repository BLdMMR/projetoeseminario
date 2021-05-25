package pt.isel.leic.ps.g42.Cri_Art.controllers.ArtistTagController

import com.fasterxml.jackson.annotation.JsonCreator
import pt.isel.leic.ps.g42.Cri_Art.models.Tag

class TagInputModel @JsonCreator constructor(
    val tagName: String
){
    fun toTag() : Tag {
        return Tag(tagName)
    }
}
