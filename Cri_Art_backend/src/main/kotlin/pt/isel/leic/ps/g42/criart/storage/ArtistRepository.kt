package pt.isel.leic.ps.g42.criart.storage

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import pt.isel.leic.ps.g42.criart.STORAGE_LOCATION
import pt.isel.leic.ps.g42.criart.models.Artist
import pt.isel.leic.ps.g42.criart.models.Tag
import pt.isel.leic.ps.g42.criart.storage.irepositories.IArtistRepository
import java.io.File
import java.util.*

/**
* To run elasticsearch: docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.12.1
* **/

@Component
class ArtistRepository (private val es_repository : IArtistRepository){

    private val logger = LoggerFactory.getLogger("Artist Repository Logger")

    fun addArtist(artist: Artist): Boolean {
        File("$STORAGE_LOCATION\\${artist.artist_id}").mkdir()
        es_repository.save(artist)
        return true
    }

    fun getAllArtistsByTag(tag :Tag): List<Artist> {
        return es_repository.findAll().toList().filter { it.tags.contains(tag) }
    }

    //DEBUG TO SEE WHAT'S IN REPO
    fun getAllArtists(): List<Artist> {
        return es_repository.findAll().toList();
    }

    fun addTagToArtist(artist_id: UUID, tag: String): Artist? {
        val artist : Artist? = getArtistById(artist_id)
        if (artist != null) {
            es_repository.delete(artist)
            if(artist.tags == null) artist.tags = LinkedList<String>()
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

    fun searchArtist(nameToSearchBy: String): List<Artist> {
        val all = es_repository.findAll()
        val filtered = all.filter { it.username == nameToSearchBy || it.username.contains(nameToSearchBy) || it.description.contains(nameToSearchBy) }
        return filtered
    }

    private val tags = listOf(
            "Digital Drawing", "Vector Drawing", "Logo Design", "Drawing in paper",
            "Architectural Design", "Fashion Design", "Web Design", "Interior Design",
            "Image Editing", "Photography", "Filming", "Video Editing", "Visual FX",
            "Video Correction", "Creative Writing - BD", "Creative Writing - Poetry",
            "Creative Writing - Fiction", "Storytelling", "Document writing", "Sculpting",
            "3D Modeling", "Music - Composition", "Lyric Writing", "Ad Music Composition",
            "Singing", "Voice-over", "Narration", "Acting", "Film Director", "Producer",
            "Magic & Illusion", "Arts & Crafts"
    )

    fun getAllTags(): List<String> {
        return tags
    }

    /*
    *
    * Tags_ Disponíveis (Tanto para perfil como para trabalho)
 - Desenho
      - Desenho digital
      - Desenho vetorial
      - Desenho de logotipos
      - Desenho em papel
      - Desenho arquitetónico
 - Design
      - Design de moda
      - Web design
      - Design de interiores
 - Imagem
      - Edição de imagem
      - Fotografia
 - Video
      - Filmagem
      - Edição de video
      - Efeitos especiais
      - Correção de videos
 - Escrita
      - Escrita creativa
         - BD
         - Poesia
         - Romances
      - _Storytelling_
      - Cópia de documentos
 - Escultura
      - Escultura em pedra
      - Escultura em gesso
      - Escultura em madeira
      - Modelação 3D
 - Música
      - Composição
      - Escrita de música publicitária
 - Voz
      - Canto
      - _Voice-overs_
      - Narração
 - Teatro/Cinema
      - Ator
      - Realizador
      - Produtor
      - Ilusionismo
    * */
}
