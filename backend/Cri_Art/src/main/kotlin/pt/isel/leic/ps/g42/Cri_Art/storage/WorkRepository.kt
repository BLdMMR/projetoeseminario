package pt.isel.leic.ps.g42.Cri_Art.storage

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Work
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IWorkRepository

@Component
class WorkRepository (private val es_repository : IWorkRepository){

}

