import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import {Artist} from "../search/SearchResult";
import "./ArtistProfile.css"
import WorkManagement from "./work/WorkManagement";


export default function ArtistProfile(props: any) {
    const id = useLocation().pathname.split('/')[2]
    const [data, setData] = useState<Artist>()
    const [follow, setFollow] = useState<string | undefined>(undefined)


     useEffect(() => {
         if (!data) {
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                `/artist/${id}?token=${AuthService.getToken()}`,
                new Headers()
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
            `/artist/${id}/follow?token=${AuthService.getToken()}`,
            new Headers()
        )
        console.log("User wants to follow this artist")
    }

    if (data) {
        return id !== AuthService.getId() ? (
            <div className="artist-profile">
                <input type={"checkbox"} className={"btn-check"} id={"btn-check-follow"} onClick={handleFollow}/>
                <label className="btn btn-outline-primary" htmlFor={"btn-check-follow"} onClick={()=>{setFollow(follow === "Follow" ? "Following" : "Follow")}} defaultChecked={follow != "Follow"}>{follow}</label>

                <div>
                    {data.tags.map((tag) => {
                        return <button className={"btn btn-outline-primary"}>{tag}</button>
                    })}
                </div>
                <h2>Profile of artist with id {id}</h2>
                <h1>{data.username}</h1>
                <p>{data.description}</p>
                <WorkManagement id={id}/>
            </div>
        ): (
            <div className="artist-profile">
                <div>
                    <h4>Tags:</h4>
                    {data.tags.map((tag) => {
                        return <button className={"btn btn-outline-primary"}>{tag}</button>
                    })}
                </div>
                <div>
                <div >
                    <h2>Profile of artist with id {id}</h2>
                    <h1>{data.username}</h1>
                    <p>{data.description}</p>

                    <h4>You are the owner</h4>
                </div>
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