import {MessageService} from "../api/MessageService";
import {useState} from "react";



export default function ChatMessages(props: any) {
  const [typedMessage, setTypedMessage] = useState<string>("")


  return <div>
    <div className={"chat-message-list-section"}>
      {props.messages.map((message, idx) => <div className={"chat-message"} key={message + idx}>{message}</div>)}
    </div>
    <div className={"chat-input-section"}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Type message"
               value={typedMessage}
               onChange={(e) => setTypedMessage(e.target.value)}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button"
                  onClick={() => {
                    MessageService.sendMessage(typedMessage)
                    setTypedMessage("")
                  }}>Send
          </button>
        </div>
      </div>
    </div>
  </div>
}