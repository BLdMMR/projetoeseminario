import lg from '../../icons/new_logo.svg'
import mnlg from '../../icons/logo_mini.svg'
import ollg from '../../icons/logo.svg'

import './WorkComponent.css'
import {useRef} from "react";

export default function WorkComponent(props: any) {


    return(
        <div className={"work-panel"}>
            <h2>Works</h2>
            <img className={'work-image'} src={lg}/>
            <img className={'work-image'} src={mnlg}/>
            <img className={'work-image'} src={ollg}/>

            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                Add Work to Portfolio
            </button>

            <div className="offcanvas offcanvas-bottom" tabIndex={4} id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasBottomLabel">Add Work</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>
                </div>
                <div className="offcanvas-body small">
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Default file input example</label>
                        <input className="form-control" type="file" id="formFile"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

