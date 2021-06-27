package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.models.WorkSaveModel
import pt.isel.leic.ps.g42.criart.storage.ArtistRepository
import pt.isel.leic.ps.g42.criart.storage.WorkRepository

@Component
class HomeServices (private val artistRepository: ArtistRepository, private val workRepository: WorkRepository){
    fun searchByName(nameToSearchBy: String): Searchlist {
        val artistList = artistRepository.searchArtist(nameToSearchBy)
        val worklist = workRepository.searchWork(nameToSearchBy)
        return Searchlist(artistList, worklist)
    }

    fun searchByTag(tag: Tag): Searchlist {
        val artistlist = artistRepository.getAllArtistsByTag(tag)
        val workList = workRepository.getAllWorksByTag(tag)
        return Searchlist(artistlist, workList)
    }

    class Searchlist(val artistList: List<Artist>, val workList: List<WorkSaveModel>)
}