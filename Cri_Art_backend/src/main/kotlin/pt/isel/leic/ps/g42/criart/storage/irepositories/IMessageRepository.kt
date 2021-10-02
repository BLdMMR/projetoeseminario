package pt.isel.leic.ps.g42.criart.storage.irepositories

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.elasticsearch.annotations.Query
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository
import pt.isel.leic.ps.g42.criart.models.Message
import java.util.*


@Repository
interface IMessageRepository: ElasticsearchRepository<Message, UUID> {

    @Query("{\"bool\" : {\"should\": [" +
            "{\"match\" : {\"senderUsername\" : \"?0\"}}," +
            "{\"match\" : {\"recipientUsername\" : \"?1\"}}" +
            "]}}")
    fun findByUsername(senderUsername: String, recipientUsername: String, pageable: Pageable): Page<Message?>
}