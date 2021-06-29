package pt.isel.leic.ps.g42.criart.storage.irepositories

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import java.util.*

interface IWorkRepository : ElasticsearchRepository<WorkSaveModel, UUID>