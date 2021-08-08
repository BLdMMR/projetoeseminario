import "./ProfileCreation.css"
import {Api, HTTP_METHOD} from "../api/Api";
import {useEffect} from "react";

function ProfileCreation(props: any) {
    /**
     * Load all tags from backend API.
     * Present all tags as radio buttons with onChange/onClick method to register selected tags in a map
     * Create Artist button submits all to backend for processing
     * **/

    const tagMap = new Map<string, boolean>()
    let tagList :string[] = []
    useEffect(() => {
        Api.fetchFromAPI(
            HTTP_METHOD.GET,
            "/public/tags",
            new Headers()
        ).then(tags => {
            tagList = tags
            tags.forEach((tag :string) => tagMap.set(tag, false))
            console.log(tagMap)
        })
    }, [])

    function renderTag(tag: string){
        console.log("Rendering tag " + tag)
        return (
            <label className="btn btn-outline-primary" htmlFor="btncheck2">
                <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"/>{tag}
            </label>
        )
    }

    return (
        <div className="profile-creation-form">
            <h4>Profile Creation: </h4>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"/>
                <label htmlFor="floatingTextarea2">Insert the description of your profile here!</label>
            </div>
            <div>
                {tagList.map(renderTag)}
            </div>
        </div>
    )
}

export default ProfileCreation