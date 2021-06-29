package pt.isel.leic.ps.g42.criart.controllers.WorkController

import com.fasterxml.jackson.annotation.JsonCreator
import org.springframework.web.multipart.MultipartFile
import pt.isel.leic.ps.g42.criart.models.Work
import java.util.*

class WorkInputModel @JsonCreator constructor(
    val name :String,
    val content: MultipartFile,
    val description: String?
) {
     fun toWork(ownerID: UUID): Work {
        return Work(
            content = content,
            work_name = name,
            owner = ownerID,
            description = description
        )
    }
}

//class WorkOutputModel {
//    val name :String
//    val id :UUID
//    val description :String?
//    val reviews :Float
//    val tags :List<Tag>
//    val owner :UUID
//
//
//    constructor(work: Work) {
//        name = work.work_name
//    }
//}