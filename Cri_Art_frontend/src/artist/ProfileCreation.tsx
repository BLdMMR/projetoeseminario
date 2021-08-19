import "./ProfileCreation.css"
import {Api, HTTP_METHOD} from "../api/Api";
import {useEffect, useRef, useState} from "react";
import {AuthService} from "../api/AuthService";
import {useHistory} from "react-router-dom";

function ProfileCreation(props: any) {
    /**
     * Load all tags from backend API.
     * Present all tags as radio buttons with onChange/onClick method to register selected tags in a map
     * Create Artist button submits all to backend for processing
     * **/
    const history = useHistory()
    const [taglist, setTagList] = useState(new Array<string>())
    const tagMap = new Map<string, boolean>()
    const descRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (!taglist[0]) {
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                "/public/tags",
                new Headers()
            ).then(tags => {
                setTagList(tags)
                tags.forEach((tag :string) => tagMap.set(tag, false))
                console.log(tagMap)
            })
        }
    }, [taglist, setTagList])

    function handleTagClick(tag: string) {
        tagMap.set(tag, !tagMap.get(tag))
    }

    function handleCreateProfile() {
        const finalTags = taglist.filter(tag => tagMap.get(tag))
        const description = descRef.current?.value

        Api.fetchFromAPI(
            HTTP_METHOD.POST,
            `/artist?token=${AuthService.getToken()}`,
            {
                description: description,
                tags: finalTags
            }
        ).then((success) => {
            console.log("Did it succeed?")
            console.log(success)
            if (success) {
                history.push(`home?token=${AuthService.getToken()}`)
            }
        })
    }

    return (
        <div className="profile-creation-form">
            <h4>Profile Creation: </h4>
            <div className="form-floating">
                <h6>Please write de description that you want to be presented on your profile:</h6>
                <textarea ref={descRef} className={"textarea"} placeholder={"Write the description here"}/>
            </div>
            <div>
                <h4>Select the tags you identify your work with:</h4>
                {taglist.map((tag) => {
                    return(
                        <span className="checkbox-optn">
                        <input type="checkbox" className="btn-check" id={"btn-check"+tag} onClick={() => {handleTagClick(tag)}} defaultChecked={false} autoComplete="off"/>
                            <label className="btn btn-outline-primary" htmlFor={"btn-check"+tag}>{tag}</label>
                        </span>
                    )
                })}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreateProfile}>Create Profile</button>
        </div>
    )
}

export default ProfileCreation