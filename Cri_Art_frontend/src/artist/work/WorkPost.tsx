import {Work} from "./WorkList";
import {useEffect, useState} from "react";
import {AuthService} from "../../api/AuthService";
import {Api, HTTP_METHOD} from "../../api/Api";

import arrow_up from "../../icons/arrow_up.svg"
import arrow_up_rev from "../../icons/arrow_up_rev.svg"
import comment_icon from "../../icons/comment_icon.svg"
import { SRLWrapper } from "simple-react-lightbox";

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
            <div className={"modal fade"} id={`exampleModalToggle-${work.id}`} aria-hidden="true"
                 aria-labelledby="exampleModalToggleLabel">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">{work.work_name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <SRLWrapper>
                                {/*<a href = {`data:image/${work.fileExtension};base64,` + work.content}></a>*/}
                                <img src={`data:image/${work.fileExtension};base64,` + work.content} alt={work.work_name}
                                     className={"work-image-modal"}/>
                            </SRLWrapper>


                            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0"
                                         className="scrollspy-example" >
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
                    <button className={"btn btn-primary"} id={'upvote'}>
                        <img src={comment_icon} onClick={handleComment}/>
                    </button>
                </div>
                <input className="form-control" type="text" placeholder="Write a comment" aria-label="default input example"/>
            </div>
        </div>


    )

}