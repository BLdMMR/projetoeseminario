import {TextMessage} from "../api/MessageService";


export default function ChatContacts(props: any) {
  const usernames = props.messages.map((msg: TextMessage) => msg.senderUsername);
  const usernamesNonRepeated: Array<string> = Array.from(new Set(usernames))

  return <div className={"chat-message-list-section"}>
      <span className={"contacts-title"}>Contacts</span><br/>
      {usernamesNonRepeated.map((username: string, idx: number) =>
        <div className={"chat-message contact"} key={username + idx}
             onClick={(_) => props.selectUsername(username)}>
          &nbsp;&nbsp;{username}
        </div>
      )}
    </div>
}