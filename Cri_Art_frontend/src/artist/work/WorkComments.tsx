import {Work} from "./WorkList";


export default function WorkComments(props: {work: Work}) {
    const work = props.work

    return (
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <img src={`data:image/${work.fileExtension};base64,` + work.content}/>
            <div>

            </div>
        </div>
    )
}