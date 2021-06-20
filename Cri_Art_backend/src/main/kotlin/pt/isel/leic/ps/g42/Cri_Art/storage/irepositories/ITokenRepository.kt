package pt.isel.leic.ps.g42.Cri_Art.storage.irepositories

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository
import pt.isel.leic.ps.g42.Cri_Art.models.Token
import java.util.*

@Repository
interface ITokenRepository: ElasticsearchRepository<Token, UUID>