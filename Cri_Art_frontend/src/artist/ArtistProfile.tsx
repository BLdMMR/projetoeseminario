import {useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import {Artist} from "../search/SearchResult";
import "./ArtistProfile.css"
import WorkManagement from "./work/WorkManagement";
import {MessageService} from "../api/MessageService";
import {UserActionService} from "../user/UserActionService";



export default function ArtistProfile(props: any) {
    const id = useLocation().pathname.split('/')[2]
    const [data, setData] = useState<Artist>()
    const [follow, setFollow] = useState<string | undefined>(undefined)

    const messageRef = useRef<HTMLTextAreaElement>(null)


     useEffect(() => {
         if (!data) {
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                `/artist/${id}?token=${AuthService.getToken()}`
            ).then(response => {
                console.log("Response: ")
                 console.log(response)
                if(response) {
                    setData(response)
                    console.log(response)
                }

            }).catch( err => {
                console.error(err)
            })
         }
         if (!follow) {
             setFollow("Follow")
             AuthService.getUser()?.listOfFollows.forEach((artist_id) => {
                 if (artist_id === id) {
                     setFollow("Following")
                 }
             })
         }
     }, [data, setData, follow, setFollow, id])

    function handleFollow() {
        Api.fetchFromAPI(
            HTTP_METHOD.PUT,
            `/artist/${id}/follow?token=${AuthService.getToken()}`
        )
        console.log("User wants to follow this artist")
    }

    const followCheckbox = AuthService.getToken() ?
        <span><input type={"checkbox"} className={"btn-check"} id={"btn-check-follow"} onClick={handleFollow}/>
    <label className="btn btn-outline-primary" htmlFor={"btn-check-follow"} onClick={()=>{setFollow(follow === "Follow" ? "Following" : "Follow")}} defaultChecked={follow != "Follow"}>{follow}</label></span> :
        <h6>Log in to follow</h6>

    function handleSendMessage() {
        MessageService.sendMessage(data!!.username, messageRef.current!!.value)
    }

    function handleOpenChat() {
        UserActionService.selectUsernameChat(data!!.username)
    }

    if (data) {

        return id !== AuthService.getId() ? (
            <div className="artist-profile">
                <div className={"artist-details"}>
                    <h2>{data.username}</h2>
                        <p className={'artist-description'}>{data.description}</p>
                    {followCheckbox}
                    <div>
                        {data.tags.map((tag, idx) => {
                            return <button key={tag + idx} className={"btn btn-outline-primary"}>{tag}</button>
                        })}
                    </div>
                     <button type="button" className="btn btn-primary" onClick={handleOpenChat}>
                         Message Artist
                     </button>
                </div>
                <div className={"artist-portfolio"}>
                    <WorkManagement id={id}/>
                </div>
            </div>
        ): (
            <div className="artist-profile">
                <div className={"artist-details"}>
                    <h2>{data.username}</h2>
                    <span>
                        <p className={"artist-description"}>{data.description}</p>
                    </span>
                    <EditProfile artistInfo={data}/>
                    <div>
                        {data.tags.map((tag, idx) => {
                            return <button key={tag + idx} className={"btn btn-outline-primary artist-tag"}>{tag}</button>
                        })}
                    </div>
                </div>
                <div className={"artist-portfolio"}>
                    <WorkManagement id={id}/>
                </div>
            </div>
        )
    } else {
        return (
            <h2>Loading...</h2>
        )
    }

}

function EditProfile(props: {artistInfo: Artist}) {
    const descRef = useRef<HTMLTextAreaElement>(null)
    const [taglist, setTagList] = useState(new Array<string>())
    const tagMap = new Map<string, boolean>()



    useEffect(() => {
        console.log("EFFECT")

        if (!taglist[0]) {
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                "/public/tags"
            ).then(tags => {
                console.log("on Then")
                setTagList(tags)
                tags.forEach((tag :string) => {
                    if (props.artistInfo.tags.find((tagtf) => tagtf == tag)) {
                        tagMap.set(tag, true)
                    }
                    else tagMap.set(tag, false)
                })
                console.log(tagMap)
            })
        }
    }, [taglist, setTagList])

    function handleTagClick(tag: string) {
        tagMap.set(tag, !tagMap.get(tag))
    }

    function handleSaveChanges() {
        console.log(tagMap)
        console.log(descRef.current?.value)
    }

    return (
        <div>
            <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit Profile
            </button>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating">
                                <h6>Please write de description that you want to be presented on your profile:</h6>
                                <textarea ref={descRef} className={"textarea"} placeholder={"Write the description here!"}/>
                            </div>
                            <div>
                                <h4>Select the tags you identify your work with:</h4>
                                {taglist.map((tag) => {
                                    return(
                                        <span className="checkbox-optn">
                                            <input type="checkbox" className="btn-check" id={"btn-check"+tag} onClick={() => {handleTagClick(tag)}} defaultChecked={props.artistInfo.tags.find((ttf) => ttf == tag)?true:false} autoComplete="off"/>
                                            <label className="btn btn-outline-primary" htmlFor={"btn-check"+tag}>{tag}</label>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


//
// <button type="button" className="btn btn-primary" data-bs-toggle="modal"
//         data-bs-target="#MessageModal">
//     Message Artist
// </button>
//
// <div className="modal fade" id="MessageModal" aria-labelledby="exampleModalLabel"
//      aria-hidden="true">
//     <div className="modal-dialog">
//         <div className="modal-content" id={"message-modal-content"}>
//             <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">{`Message ${data.username}`}</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal"
//                         aria-label="Close"></button>
//             </div>
//             <div className="modal-body" id={"message-modal-body"}>
//                 <textarea ref={messageRef}/>
//             </div>
//             <div className="modal-footer">
//                 <button type="button" className="btn btn-primary" onClick={handleSendMessage}>Send Message</button>
//             </div>
//         </div>
//     </div>
// </div>

