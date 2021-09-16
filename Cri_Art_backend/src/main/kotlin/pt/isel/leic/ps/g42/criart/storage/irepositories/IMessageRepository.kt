package pt.isel.leic.ps.g42.criart.storage.irepositories

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository
import pt.isel.leic.ps.g42.criart.models.Message
import java.util.*


@Repository
interface IMessageRepository: ElasticsearchRepository<Message, UUID>