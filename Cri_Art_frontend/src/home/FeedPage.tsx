import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../api/Api";
import {AuthService} from "../api/AuthService";
import {Work} from "../artist/work/WorkList";
import {Artist} from "../search/SearchResult";


function FeedPage(props: any) {
    const [feed, setFeed] = useState<Feed>(new Feed(undefined))
    let feeed : Feed = new Feed(undefined)

    console.log("HasFeed = " + feed.pubList)

    useEffect(() => {
        if (!feed.pubList) {
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                `/feed?token=${AuthService.getToken()}`,
                new Headers()
            ).then((resFeed :Feed) => {
                setFeed(resFeed)
                feeed = resFeed
                console.log("FEEED-v")
                console.log(feeed)
                console.log("FEED-v")
                console.log(feed)

            }).catch(err => {
                console.error(err)
            })
        }
    }, [feed, setFeed, feed])

    function renderFeed(work: Pub) {
        return (
            <div>
                <h1>{work.work.work_name}</h1>
            </div>
        )
    }


    if (feed.pubList != undefined){
        console.log("rerendering")
        return (
            <div>
                <h1>Feed</h1>
                {/*{feeed.pubList!!.forEach(item => renderFeed(item))}*/}
            </div>
        )
    } else {
        return (
            <div>
                <h1>Loading Feed...</h1>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    // return feed.pubList ? (
    //       <div>
    //           <h1>Feed</h1>
    //           {/*{feed.map(renderFeed)}*/}
    //       </div>
    // ):(
    //     <div>
    //         <h1>Loading Feed...</h1>
    //         <div className="spinner-border text-primary" role="status">
    //             <span className="visually-hidden">Loading...</span>
    //         </div>
    //     </div>
    // )
}

export default FeedPage

export class Feed {
    public pubList: Array<Pub> | undefined

    constructor(pubList: Array<Pub> | undefined) {
        this.pubList = pubList;

    }
}

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