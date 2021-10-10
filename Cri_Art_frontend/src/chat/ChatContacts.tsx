import {TextMessage} from "../api/MessageService";


export default function ChatContacts(props: any) {
  const senders = props.messages.map((msg: TextMessage) => msg.senderUsername);
  const recipients = props.messages.map((msg: TextMessage) => msg.recipientUsername);
  const usernamesNonRepeated: Array<string> = Array.from(new Set([...senders, ...recipients]))

  return <div className={"chat-message-list-section"}>
      <span className={"contacts-title"}>Contacts</span><br/>
      {usernamesNonRepeated.map((username: string, idx: number) =>
        <div className={"chat-message contact " +
          (props.usersNewMessages?.some((usrnm: string) => usrnm === username) ? "blinking-animation" : "")}
             key={username + idx}
             onClick={(_) => props.selectUsername(username)}>
          &nbsp;&nbsp;{username}
        </div>
      )}
    </div>
}