import {MessageService, TextMessage} from "../api/MessageService";
import {useEffect, useState} from "react";
import {AuthService} from "../api/AuthService";


export default function ChatMessaging(props: any) {
  const [typedMessage, setTypedMessage] = useState<string>("")

  useEffect(() => {
    const messageList = document.getElementById("messageList");
    messageList!!.scrollTop = messageList!!.scrollHeight;
  })

  const messages = props.messages.filter((message: TextMessage) => {
    if (props.selectedUsername === AuthService.getUser()?.name) {
      return message.senderUsername === props.selectedUsername
        && message.recipientUsername === props.selectedUsername
    } else {
      return message.senderUsername === props.selectedUsername
        || message.recipientUsername === props.selectedUsername
    }
  })

  return <div>
    <div className={"chat-user-header-section"}>
      <div>Messages from: <span className={"chat-user"}>{props.selectedUsername}</span></div>
      <div className={"back-button"} onClick={(_) => props.selectUsername('')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-left"
             viewBox="0 0 16 16">
          <path fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
      </div>
    </div>
    <div className={"chat-message-list-section"} id={"messageList"}>
      {messages.map((message: TextMessage, idx: number) =>
        <div className={"chat-message"} key={message?.time + '' + idx}>
          <span className={"chat-user"}>{message.senderUsername}</span>
          <span className={"chat-message-time"}>&nbsp;&nbsp;&nbsp;&nbsp;
            {new Date(message.time).toLocaleString("en-GB")}</span>
          <br/>
          {message.message}
        </div>)
      }
    </div>
    <div className={"chat-input-section"}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Type message"
               value={typedMessage}
               onChange={(e) => setTypedMessage(e.target.value)}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button"
                  onClick={() => {
                    MessageService.sendMessage(props.selectedUsername, typedMessage)
                    setTypedMessage("")
                  }}>Send
          </button>
        </div>
      </div>
    </div>
  </div>
}