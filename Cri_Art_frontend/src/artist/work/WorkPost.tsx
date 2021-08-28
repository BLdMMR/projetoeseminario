import {Work} from "./WorkList";
import {useEffect, useState} from "react";
import {AuthService} from "../../api/AuthService";
import {Api, HTTP_METHOD} from "../../api/Api";

import arrow_up from "../../icons/arrow_up.svg"
import arrow_up_rev from "../../icons/arrow_up_rev.svg"
import comment_icon from "../../icons/comment_icon.svg"

const videoFormats = ['mp4', 'mov', 'wmv']


export default function WorkPost(props: { work: Work }) {
    const [arrow, setArrow] = useState(arrow_up)
    const work = props.work

    useEffect(() => {
        if (work.ups.find(AuthService.getId)) {
            setArrow(arrow_up_rev)
        }
    }, [arrow])

    function isVideo(fileExtension: string) {
        videoFormats.forEach((idx) => {
            if (fileExtension === idx) return true
        })
        return false
    }

    function handleUpvote() {
        Api.fetchFromAPI(
            HTTP_METHOD.PUT,
            `/artist/${work.owner}/worksofart/${work.id}?token=${AuthService.getToken()}`
        ).then((status) => {
            arrow == arrow_up ? setArrow(arrow_up_rev) : setArrow(arrow_up)
        }).catch(err => {
            console.log(err)
        })
    }

    function handleComment() {

    }

    return isVideo(work!!.fileExtension) ? (
        <video width="320" height="240" controls>
            <source src={`data:video/${work.fileExtension};base64,${work.content}`} type={`video/webm`}/>
            <source src={`data:video/${work.fileExtension};base64,${work.content}`} type={`video/${work.fileExtension}`}/>
        </video>
    ) : (
        <div className="card">
            <img src={`data:image/${work.fileExtension};base64,` + work.content} alt={work.work_name}
                 className={"work-image"}/>
            <div className="card-body">
                <h5 className="card-title">{work.description}</h5>
                <div className={'work-actions'}>
                    <button className={"btn btn-primary"} id={'upvote'}>
                        <img src={arrow} onClick={() => handleUpvote()}/>
                    </button>
                    <button className={"btn btn-primary"} id={'upvote'}>
                        <img src={comment_icon} onClick={handleComment}/>
                    </button>
                </div>
                <input className="form-control" type="text" placeholder="Write a comment" aria-label="default input example"/>
            </div>
        </div>

    )

}