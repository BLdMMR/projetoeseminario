import {Work} from "./WorkList";
import {useEffect, useRef, useState} from "react";
import {AuthService} from "../../api/AuthService";
import {Api, HTTP_METHOD} from "../../api/Api";

import arrow_up from "../../icons/arrow_up.svg"
import arrow_up_rev from "../../icons/arrow_up_rev.svg"
import {SRLWrapper} from "simple-react-lightbox";

const videoFormats = ['mp4', 'mov', 'wmv']


export default function WorkPost(props: { work: Work }) {
    const commentRef = useRef<HTMLTextAreaElement>(null)
    const [arrow, setArrow] = useState(arrow_up)
    const work = props.work
    const [comments, setComment] = useState<Comment[]>(work.comments)

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
        const commentContent = commentRef.current!!.value
        Api.fetchFromAPI(
            HTTP_METHOD.POST,
            `/artist/${work.owner}/worksofart/${work.id}?token=${AuthService.getToken()}`,
            commentContent
        ).then(success => {
            const commentArray = comments
            commentArray.push(new Comment(commentContent, AuthService.getId()!!, work.id, AuthService.getUser()?.name!!))
            setComment(commentArray)
        }).catch(err => {
            Error(err)
        })
    }

    function renderComments(comment: Comment) {
        return (
            <div>
            <h4>{comment.userName}</h4>
            <p>{comment.comment}</p>
            </div>
        )
    }


    return isVideo(work!!.fileExtension) ? (
        <video width="320" height="240" controls>
            <source src={`data:video/${work.fileExtension};base64,${work.content}`} type={`video/webm`}/>
            <source src={`data:video/${work.fileExtension};base64,${work.content}`} type={`video/${work.fileExtension}`}/>
        </video>
    ) : (

        <div className="card">
            <div className={"modal fade"} id={`exampleModalToggle-${work.id}`} aria-hidden="true"
                 aria-labelledby="exampleModalToggleLabel">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">{work.work_name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <SRLWrapper>
                                {/*<a href = {`data:image/${work.fileExtension};base64,` + work.content}></a>*/}
                                <img src={`data:image/${work.fileExtension};base64,` + work.content} alt={work.work_name}
                                     className={"work-image-modal"}/>
                            </SRLWrapper>
                                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example">
                                    {comments.length > 0 ? comments.map(renderComments) : <h4>No Comments</h4>}
                                    <div>
                                    <h4 id="scrollspyHeading1">First heading</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.

                                    </p>
                                    <h4 id="scrollspyHeading2">Second heading</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                    <h4 id="scrollspyHeading3">Third heading</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                    <h4 id="scrollspyHeading4">Fourth heading</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                    <h4 id="scrollspyHeading5">Fifth heading</h4>
                                    <p>This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
                                    </div>
                                    <textarea className="textarea" ref={commentRef} role="textbox" contentEditable id={'comment-box'} placeholder={"Write Comment Here"}/>
                                    <button type={'button'} className={'btn btn-primary'} onClick={handleComment}>Comment</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body">
            <a data-bs-toggle="modal" href={"#exampleModalToggle"+`-${work.id}`} role="button">
                <img src={`data:image/${work.fileExtension};base64,` + work.content} alt={work.work_name}
                     className={"work-image"}/>
            </a>

                <h5 className="card-title">{work.description}</h5>
                <div className={'work-actions'}>
                    <button className={"btn btn-primary"} id={'upvote'}>
                        <img src={arrow} onClick={() => handleUpvote()}/>
                    </button>
                    {/*<button className={"btn btn-primary"} id={'upvote'}>*/}
                    {/*    <img src={comment_icon} onClick={handleComment}/>*/}
                    {/*</button>*/}
                </div>
                {/*<input className="form-control" type="text" placeholder="Write a comment" aria-label="default input example"/>*/}
            </div>
        </div>


    )

}

export class Comment {
//  "comment": "\"I like this work because I made it\"",
// 	"user_id": "09e6e8d4-b2b7-41a4-a3ff-fe6b94b884e2",
// 	"work_id": "bcbfc7da-15f4-4524-8c2e-68e8561bc466"
    public comment;
    public user_id;
    public work_id;
    public userName;

    constructor(comment: string, user_id: string, work_id: string, userName: string) {
        this.comment = comment
        this.user_id = user_id
        this.work_id = work_id
        this.userName = userName
    }
}