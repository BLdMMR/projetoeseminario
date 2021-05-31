package pt.isel.leic.ps.g42.Cri_Art.models

import org.springframework.data.annotation.Id
import org.springframework.data.elasticsearch.annotations.Document

@Document(indexName = "cri_art_user")
data class User(
    val name: String,
    @Id
    val emailAddress: String,
    val password: String
) {
    constructor(): this("", "", "")
}
