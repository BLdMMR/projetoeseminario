import lg from '../../icons/new_logo.svg'
import mnlg from '../../icons/logo_mini.svg'
import ollg from '../../icons/logo.svg'

import './WorkManagement.css'
import React, {useEffect, useRef, useState} from "react";
import {AuthService} from '../../api/AuthService';
import {Api, HTTP_METHOD} from "../../api/Api";
import WorkList from "./WorkList";
import {useHistory} from "react-router-dom";

export default function WorkManagement(props: any) {
    const history = useHistory()
    const id = props.id
    const [workAdded, setWorkAdded] = useState<boolean>(false)
    const descRef = useRef<HTMLTextAreaElement>(null)
    console.log("Id: " + id)
    let file: File | null = null

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

            fetch(`${Api.getApiBaseUrl()}/artist/${id}/worksofart?token=${AuthService.getToken()}`, {
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

    if (id == AuthService.getId()) {
        return (
            <div className={"uploadwork"}>
                <WorkList id={id}/>
            {/*    <div className="offcanvas offcanvas-bottom" tabIndex={4} id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">*/}
            {/*        <div className="offcanvas-header">*/}
            {/*            <h5 className="offcanvas-title" id="offcanvasBottomLabel">Add Work</h5>*/}
            {/*            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>*/}
            {/*        </div>*/}
            {/*        <div className="offcanvas-body small">*/}
            {/*            <div className="mb-3">*/}
            {/*                <input className="form-control" type="file" onChange={handleFileSubmited} id="formFile"/>*/}
            {/*                <textarea ref={descRef} className={"textarea"} placeholder={"Write the description of the work"}/>*/}
            {/*            </div>*/}
            {/*            <button type="button" className={"btn btn-primary"} onClick={handleSubmit}>Submit</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*<button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"*/}
            {/*            data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">*/}
            {/*        Add Work to Portfolio*/}
            {/*</button>*/}
            </div>

        )
    } else {
        console.log("Not Owner")
        return (
            <div className={"work-panel"}>
                <WorkList id={id}/>
            </div>
        )
    }


}

