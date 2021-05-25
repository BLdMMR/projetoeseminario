package pt.isel.leic.ps.g42.Cri_Art.storage.irepositories

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import pt.isel.leic.ps.g42.Cri_Art.models.Work
import java.util.*

interface IWorkRepository : ElasticsearchRepository<Work, UUID>