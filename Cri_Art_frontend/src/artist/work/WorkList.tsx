import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../../api/Api";
import {AuthService} from "../../api/AuthService";
import arrow_up from "../../icons/arrow_up.svg"
import arrow_up_rev from "../../icons/arrow_up_rev.svg"
import WorkPost from './WorkPost'
import {Link} from "react-router-dom";
import logo from "../../icons/new_logo.svg";

const videoFormats = ['mp4', 'mov', 'wmv']

export default function WorkList(props :any) {
    const id = props.id
    const [works, setWorks] = useState<Work[]>()
    const [arrow, setArrow] = useState(arrow_up)

    useEffect(()=> {
        if(!works){
            Api.fetchFromAPI(
                HTTP_METHOD.GET,
                `/artist/${id}/worksofart?token=${AuthService.getToken()}`,
                new Headers()
            ).then((listOfWorks) => {
                console.log(listOfWorks)
                setWorks(listOfWorks)
                console.log(works)
                console.log('Works Fetched')
            })
        }
    }, [works, setWorks, arrow])

    function renderWorks(work: Work) {
        return <WorkPost work={work}/>
        function isVideo(fileExtension: string) {
            videoFormats.forEach((idx) => {
                if (fileExtension === idx) return true
            })
            return false
        }
        console.log("It's a Video")
        return isVideo(work.fileExtension) ? (
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
                        <button className={"btn btn-primary"} id={'upvote'}>
                            <img src={arrow} onClick={() => {arrow == arrow_up?setArrow(arrow_up_rev):setArrow(arrow_up)}}/>
                        </button>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>

        )
    }

    return !works ? (
        <div>
            <h3>Loading works...</h3>
        </div>
    ) : (
        <div className={"work-panel"}>
            <h3>Works Of Art:</h3>
            <div>
                {works.map(renderWorks)}
            </div>
        </div>
    )
}

export class Work {
    public id: string;
    public work_name: string;
    public owner: string;
    public description: string;
    public reviews: number;
    public tags: Array<string>
    public content: string
    public fileExtension: string
    public comments: Array<string>;
    public ups: Array<string>;

    constructor(id: string, work_name: string, owner: string, description: string, reviews: number, tags: Array<string>, content: string, fileExtension: string, commments: Array<string>, ups: Array<string>) {
        this.id = id
        this.work_name = work_name
        this.owner = owner
        this.description = description
        this.reviews = reviews
        this.tags = tags
        this.content = content
        this.fileExtension = fileExtension
        this.comments = commments
        this.ups = ups
    }

}