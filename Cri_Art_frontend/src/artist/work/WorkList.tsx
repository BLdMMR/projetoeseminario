import React, {useEffect, useRef, useState} from "react";
import {Api, HTTP_METHOD} from "../../api/Api";
import {AuthService} from "../../api/AuthService";
import WorkPost, {Comment} from './WorkPost'
import {useHistory} from "react-router-dom";

export default function WorkList(props :any) {
    const id = props.id
    const [works, setWorks] = useState<Work[]>([])

    function renderWorks(work: Work) {
        return <WorkPost work={work}/>
    }

    {/*    THIS IS JUST TO CHECK SOMETHING  */}
    const history = useHistory()
    const descRef = useRef<HTMLTextAreaElement>(null)
    let file: File | null = null
    const [workAdded, setWorkAdded] = useState<boolean>(false)

    function handleFileSubmited(evt : React.ChangeEvent<HTMLInputElement>) {
        console.log(evt.target.value)
        file = evt.target.files!!.item(0)
    }

    function handleSubmit() {
        if (file){
            const fdata = new FormData()
            fdata.append('content', file)
            fdata.append('name', file.name)
            fdata.append('description', descRef.current!!.value)
            fdata.forEach(console.log)
            fetch(`http://localhost:8080/api/artist/${id}/worksofart?token=${AuthService.getToken()}`, {
                method: "POST",
                headers: new Headers(),
                body: fdata
            }).then(response => {
                console.log(response)
                history.push(`/artist/${id}?token=${AuthService.getToken()}`)
                setWorkAdded((sts) => {
                    return !sts
                })
            }).catch(err => {
                console.log("error")
            })
            //TODO->Change this to be from the API service class

            // Api.fetchFromAPI(
            //     HTTP_METHOD.POST,
            //     `/artist/${id}/worksofart?token=${AuthService.getToken()}`,
            //     headers,
            //     fdata
            // )
        }
    }
    {/*    THIS IS JUST TO CHECK SOMETHING  */}
    useEffect(()=> {
        /*
                if(works.length == 0){
        */
        Api.fetchFromAPI(
            HTTP_METHOD.GET,
            `/artist/${id}/worksofart?token=${AuthService.getToken()}`
        ).then((listOfWorks) => {
            setWorks(listOfWorks)
        })
        /*}*/
    }, [workAdded, setWorkAdded])



    return works.length == 0 ? (
        <div>
            <h3>Loading works...</h3>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        <div className={"work-panel"}>
            <h3>Works Of Art:</h3>
            <div>
                {works.map(renderWorks)}
            </div>
            {/*    THIS IS JUST TO CHECK SOMETHING  */}
            <div className="offcanvas-body small">
                <h3>Add another work to your Portfolio</h3>
                <div className="mb-3">
                    <input className="form-control" type="file" onChange={handleFileSubmited} id="formFile"/>
                    <textarea ref={descRef} className={"textarea"} placeholder={"Here you can write the description of your work"}/>
                </div>
                <button type="button" className={"btn btn-primary"} onClick={handleSubmit}>Submit</button>
            </div>

            {/*<div className="offcanvas offcanvas-bottom" tabIndex={4} id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">*/}
            {/*    <div className="offcanvas-header">*/}
            {/*        <h5 className="offcanvas-title" id="offcanvasBottomLabel">Add Work</h5>*/}
            {/*        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>*/}
            {/*    </div>*/}
            {/*    <div className="offcanvas-body small">*/}
            {/*        <div className="mb-3">*/}
            {/*            <input className="form-control" type="file" onChange={handleFileSubmited} id="formFile"/>*/}
            {/*            <textarea ref={descRef} className={"textarea"} placeholder={"Write the description of the work"}/>*/}
            {/*        </div>*/}
            {/*        <button type="button" className={"btn btn-primary"} onClick={handleSubmit}>Submit</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"*/}
            {/*        data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">*/}
            {/*    Add Work to Portfolio*/}
            {/*</button>*/}
            {/*    THIS IS JUST TO CHECK SOMETHING  */}
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
