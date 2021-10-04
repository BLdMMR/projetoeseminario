package pt.isel.leic.ps.g42.criart.storage.irepositories

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.elasticsearch.annotations.Query
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository
import pt.isel.leic.ps.g42.criart.models.User
import java.util.*


@Repository
interface IUserRepository: ElasticsearchRepository<User, UUID> {

    @Query("{\"bool\" : {\"must\": {\"match\" : {\"emailAddress\" : \"?0\"}}}}")
    fun findByEmail(email: String, pageable: Pageable): Page<User?>

    @Query("{\"bool\" : {\"must\": {\"match\" : {\"username\" : \"?0\"}}}}")
    fun findByUsername(username: String, pageable: Pageable): Page<User?>

}