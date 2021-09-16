import './Chat.css'
import {AuthService} from "../api/AuthService";
import {useState} from "react";
import {MessageService} from "../api/MessageService";
import {Subscription} from "rxjs";


export default function Chat(props: any) {
    const [open, setOpen] = useState(false)
    const [newMessage, setNewMessage] = useState<string>("")
    const [messages, setMessages] = useState<Array<string>>([])
    const [typedMessage, setTypedMessage] = useState<string>("")
    const [messageSub, setMessageSub] = useState<Subscription>()

    if (!messages.includes(newMessage)) {
        messages.push(newMessage)
    }

    if (!AuthService.getToken()) {
        return null
    }

    if (!messageSub) {
        const sub = MessageService.getMessageStream().subscribe(message => setNewMessage(message))
        setMessageSub(sub)
    }


    return <div className={"chat-wrapper " + (open ? "chat-wrapper-open" : "chat-wrapper-closed")}>
        <div className={"chat-wrapper-header"}>
            <div className={"chat-wrapper-header-title"}>Messages</div>
            <div className={"chat-wrapper-header-button"} onClick={() => setOpen(!open)}>
                {open
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                           className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                           className="bi bi-chevron-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                      </svg>}
            </div>
        </div>
        <div className={"chat-message-list-section"}>
            {
                messages.map(message => <div className={"chat-message"}>{message}</div>)
            }
        </div>
        <div className={"chat-input-section"}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Type message"
                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                    onChange={(e) => setTypedMessage(e.target.value)}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button"
                        onClick={() => MessageService.sendMessage(typedMessage)}>Send</button>
                </div>
            </div>
        </div>

    </div>
}