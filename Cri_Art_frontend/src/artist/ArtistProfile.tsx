import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import {Artist} from "../search/SearchResult";
import "./ArtistProfile.css"
import WorkComponent from "./work/WorkComponent";


export default function ArtistProfile(props: any) {
    const id = useLocation().pathname.split('/')[2]
    const [data, setData] = useState<Artist>()

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
     }, [data, setData])

    if (data) {
        return id != AuthService.getId() ? (
            <div className="artist-profile">
                <div>
                    {data.tags.map((tag) => {
                        return <button className={"btn btn-outline-primary"}>{tag}</button>
                    })}
                </div>
                <h2>Profile of artist with id {id}</h2>
                <h1>{data.username}</h1>
                <p>{data.description}</p>
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
                    <WorkComponent id={id}/>
                </div>
            </div>
        )
    } else {
        return (
            <h2>Loading...</h2>
        )
    }

}