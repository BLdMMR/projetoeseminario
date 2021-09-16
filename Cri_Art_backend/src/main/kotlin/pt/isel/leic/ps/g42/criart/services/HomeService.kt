package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.controllers.ArtistController.ArtistOutputModel
import pt.isel.leic.ps.g42.criart.controllers.HomeController.FeedPost
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

    fun getFeed(listOfFollows: List<UUID>): List<FeedPost> {
        val list :LinkedList<FeedPost> = LinkedList()
        for(id :UUID in listOfFollows){
            val currArtist = artistRepository.getArtistById(id)
            for(work: WorkSaveModel in workRepository.getWorksFromLastWeek(id)){
                list.add(work.toWorkPost(currArtist!!.artist_id, currArtist.username))
            }
        }
        return list
    }
}