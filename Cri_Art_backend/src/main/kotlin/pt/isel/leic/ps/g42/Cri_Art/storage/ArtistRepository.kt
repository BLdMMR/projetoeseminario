package pt.isel.leic.ps.g42.Cri_Art.storage

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.Cri_Art.models.Artist
import pt.isel.leic.ps.g42.Cri_Art.models.Tag
import pt.isel.leic.ps.g42.Cri_Art.storage.irepositories.IArtistRepository
import java.util.*


/**
* To run elasticsearch: docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.12.1
* **/

@Component
class ArtistRepository (private val es_repository : IArtistRepository){

    private val logger = LoggerFactory.getLogger("Artist Repository Logger")

    fun addArtist(artist: Artist): Artist {
        return es_repository.save(artist)
    }

    fun getAllArtistsByTag(tag :Tag): List<Artist> {
        return es_repository.findAll().toList().filter { it.tags.contains(tag) }
    }

    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return es_repository.findAll().toList();
    }

    fun addTagToArtist(artist_id: UUID, tag: Tag): Artist? {
        val artist : Artist? = getArtistById(artist_id)
        if (artist != null) {
            es_repository.delete(artist)
            if(artist.tags == null) artist.tags = LinkedList<Tag>()
            artist.tags.add(tag)
            es_repository.save(artist)
        }
        return artist
    }

    fun getArtistById(id: UUID): Artist? {
        return es_repository.findById(id).get()
    }

    fun removeTagFromArtist(artistId: UUID, tag: Tag): Artist? {
        val artist = getArtistById(artistId)
        if (artist?.tags != null && !artist.tags!!.isEmpty()) {
            es_repository.delete(artist)
            artist.tags!!.remove(tag)
            es_repository.save(artist)
        }
        return artist

    }

}
