package pt.isel.leic.ps.g42.criart.services

import org.springframework.stereotype.Service
import pt.isel.leic.ps.g42.criart.models.User
import pt.isel.leic.ps.g42.criart.storage.irepositories.IUserRepository
import java.util.*


@Service
class UserService (private val repository: IUserRepository) {

    fun followArtist(user: User, artist_id: UUID?) {
        if (!user.listOfFollows.contains(artist_id)) {
            val newList = LinkedList(user.listOfFollows)
            newList.add(artist_id!!)
            user.listOfFollows = newList as List<UUID>
            repository.deleteById(user.id)
            repository.save(user)
        } else {
            val newList = LinkedList(user.listOfFollows)
            newList.remove(artist_id!!)
            user.listOfFollows = newList as List<UUID>
            repository.deleteById(user.id)
            repository.save(user)
        }

    }

}
