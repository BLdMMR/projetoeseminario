import {Work} from "./WorkList";
import {useEffect, useRef, useState} from "react";
import {AuthService} from "../../api/AuthService";
import {Api, HTTP_METHOD} from "../../api/Api";

import arrow_up from "../../icons/arrow_up.svg"
import arrow_up_rev from "../../icons/arrow_up_rev.svg"
import comment_icon from "../../icons/comment_icon.svg"

const videoFormats = ['mp4', 'mov', 'wmv']


export default function WorkPost(props: { work: Work }) {
    const [arrow, setArrow] = useState(arrow_up)
    const [toggleComment, setToggleComment] = useState<boolean>(false)
    const commentRef = useRef<HTMLInputElement>(null)
    const work = props.work
    const [detailsRequested, setDetailsRequested] = useState<boolean>(false)

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
            `/artist/${work.owner}/worksofart/${work.id}?token=${AuthService.getToken()}`,
            new Headers(),
        ).then((status) => {
            arrow == arrow_up ? setArrow(arrow_up_rev) : setArrow(arrow_up)
        }).catch(err => {
            console.log(err)
        })
    }

    function handleComment() {
        const comment = commentRef.current!!.value
        if (comment) {
            Api.fetchFromAPI(
                HTTP_METHOD.POST,
                `/artist/${work.owner}/worksofart/${work.id}`,
                new Headers(),
            ).then(() => {
                console.log("Comment added")
            })
        }
    }

    function showCommentBox() {
        setToggleComment(!toggleComment)
    }

    function renderComments() {
        return
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
                        <img src={comment_icon} onClick={showCommentBox}/>
                    </button>
                </div>
                <div hidden={!toggleComment}>
                    <div className="col-auto">
                        <label htmlFor="inputPassword2" className="visually-hidden">Write Comment Here...</label>
                        <input type="text" className="form-control" id="inputPassword2" ref={commentRef} placeholder="Comment"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" onClick={handleComment}>Comment</button>
                    </div>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" hidden={!detailsRequested}>
                        <img src={`data:image/${work.fileExtension};base64,` + work.content}/>
                        <div>
                            {work.comments.map(renderComments)}
                        </div>
                    </div>
                </div>
                {/*<input className="form-control" type="text" placeholder="Write a comment" hidden={!toggleComment} aria-label="default input example"/>*/}
            </div>
        </div>
    )

}