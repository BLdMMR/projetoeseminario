import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import './Feed.css'
import {useHistory} from "react-router-dom";

function FeedPage(props: any) {
    const [feed, setFeed] = useState<Pub[]>()
    const history = useHistory()

    if (!feed) {
        Api.fetchFromAPI(
            HTTP_METHOD.GET,
            `/feed?token=${AuthService.getToken()}`
        ).then((resFeed) => {
            setFeed(resFeed)

        }).catch(err => {
            console.error(err)
        })
    }

    function renderFeed(work: Pub) : JSX.Element{
        console.log("Printing " + work.work.work_name)
        return (
            <div className="card">
                <img src={`data:image/${work.work.fileExtension};base64,` + work.work.content} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{work.artist_name}</h5>
                        <p className="card-text">{work.work.description}</p>

                        <button type={"button"} className={"btn btn-primary"} onClick={() => history.push(`/artist/${work.artist_id}`)}>Go To Profile</button>
                    </div>
            </div>
        )
    }

    return feed ? (
        <div className={'feed'}>
            {feed!.map(renderFeed)}
        </div>
    ) : (
        <div className={"loading-feed"}>
            <h2>Loading Feed...</h2>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default FeedPage

class Pub {
    public work: WorkFeedModel;
    public artist_id: string;
    public artist_name: string;
    constructor(work: WorkFeedModel, artist_id: string, artist_name: string) {
        this.work = work;
        this.artist_id = artist_id;
        this.artist_name = artist_name;
    }
}

class WorkFeedModel{
    public id: string;
    public work_name: string;
    public description: string;
    public content: object;
    public fileExtension: string;


    constructor(id: string, work_name: string, description: string, content: object, fileExtension: string) {
        this.id = id;
        this.work_name = work_name;
        this.description = description;
        this.content = content;
        this.fileExtension = fileExtension;
    }
}