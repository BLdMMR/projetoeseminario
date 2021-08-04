package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.controllers.ArtistController.ArtistOutputModel
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import pt.isel.leic.ps.g42.criart.storage.ArtistRepository
import pt.isel.leic.ps.g42.criart.storage.WorkRepository
import java.util.*

@Component
class HomeService (private val artistRepository: ArtistRepository, private val workRepository: WorkRepository){
    fun searchByName(nameToSearchBy: String): Searchlist {
        val artistList = artistRepository.searchArtist(nameToSearchBy)
        val aomlist: LinkedList<ArtistOutputModel> = LinkedList()
        artistList.forEach { aomlist.add(it.toOutputModel()) }
        val worklist = workRepository.searchWork(nameToSearchBy)
        return Searchlist(aomlist, worklist)
    }

    fun searchByTag(tag: Tag): Searchlist {
        val artistList = artistRepository.getAllArtistsByTag(tag)
        val aomlist: LinkedList<ArtistOutputModel> = LinkedList()
        artistList.forEach { aomlist.add(it.toOutputModel()) }
        val workList = workRepository.getAllWorksByTag(tag)
        return Searchlist(aomlist, workList)
    }

    class Searchlist(val artistList: List<ArtistOutputModel>, val workList: List<WorkSaveModel>)

    fun getAllTags(): List<String> {
        return artistRepository.getAllTags()
    }
}