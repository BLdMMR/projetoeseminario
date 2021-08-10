import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../../api/Api";
import {AuthService} from "../../api/AuthService";


export default function WorkList(props :any) {
    const id = props.id
    const [works, setWorks] = useState<Work[]>()

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
    }, [works, setWorks])

    function renderWorks(work: Work) {
        return(
            <img src={`data:image/${work.fileExtension};base64,` + work.content} alt={work.work_name} className={"work-image"}/>
        )
    }

    return !works?(
        <div>
            <h3>LOADING WORKS...</h3>
        </div>
    ) : (
        <div>
            <h3>WORKS:</h3>
            {works.map(renderWorks)}
        </div>
    )
}

export class ListOfWorks {
    list: Array<Work>;
    constructor(list: Array<Work>) {
        this.list = list
    }
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

    constructor(id: string, work_name: string, owner: string, description: string, reviews: number, tags: Array<string>, content: string, fileExtension: string, commments: Array<string>) {
    this.id = id
    this.work_name = work_name
    this.owner = owner
    this.description = description
    this.reviews = reviews
    this.tags = tags
    this.content = content
    this.fileExtension = fileExtension
    this.comments = commments
    }

}