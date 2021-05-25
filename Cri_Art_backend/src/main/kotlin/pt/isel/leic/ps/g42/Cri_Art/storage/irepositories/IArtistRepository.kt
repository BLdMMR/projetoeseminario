package pt.isel.leic.ps.g42.Cri_Art.storage.irepositories

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Repository
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import java.util.*

@Repository
interface IArtistRepository : ElasticsearchRepository<Artist, UUID>