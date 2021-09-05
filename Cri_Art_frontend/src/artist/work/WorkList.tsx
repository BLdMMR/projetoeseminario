import {useEffect, useState} from "react";
import {Api, HTTP_METHOD} from "../../api/Api";
import {AuthService} from "../../api/AuthService";
import WorkPost from './WorkPost'

export default function WorkList(props :any) {
    const id = props.id
    const [works, setWorks] = useState<Work[]>([])

    useEffect(()=> {
/*
        if(works.length == 0){
*/
        Api.fetchFromAPI(
            HTTP_METHOD.GET,
            `/artist/${id}/worksofart?token=${AuthService.getToken()}`,
            new Headers()
        ).then((listOfWorks) => {
            setWorks(listOfWorks)
        })
        /*}*/
    }, [])

    function renderWorks(work: Work) {
        return <WorkPost work={work}/>
    }

    return works.length == 0 ? (
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
    public comments: Array<Comment>;
    public ups: Array<string>;

    constructor(id: string, work_name: string, owner: string, description: string, reviews: number, tags: Array<string>, content: string, fileExtension: string, commments: Array<Comment>, ups: Array<string>) {
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

class Comment{
    public comment: string
    public wid: string
    public uid: string

    constructor(comment: string, work_id: string, user_id: string) {
        this.comment = comment
        this.wid = work_id
        this.uid = user_id
    }
}