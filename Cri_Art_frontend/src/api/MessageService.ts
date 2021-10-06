import {Dispatch, SetStateAction} from "react";
import {AuthService} from "./AuthService";
import Chat from "../chat/Chat";
import {Observable, Subject} from "rxjs";

export interface TextMessage {
  messageId: string;
  senderUsername: string;
  recipientUsername: string;
  message: string;
  time: number;
}

export class MessageService {

  //private static readonly WEBSOCKET_ADDRESS = "wss://cri-art.herokuapp.com/api/message"

  private static readonly WEBSOCKET_ADDRESS = "ws://localhost:8080/api/message"


  private static websocket?: WebSocket;
  private static isInitialized: boolean

  private static readonly messageEmitter: Subject<TextMessage> = new Subject()
  private static readonly messageStream: Observable<TextMessage> = MessageService.messageEmitter.asObservable()

  private static readonly keepAliveInterval = setInterval(() => {
    if (MessageService.websocket?.readyState === WebSocket.OPEN) {
      MessageService.websocket?.send('__keepalive_ping__')
    }
  }, 3000)

  public static initialize() {
    const websocketIsDead = this.websocket == null || this.websocket.readyState === WebSocket.CLOSED;
    if (websocketIsDead && AuthService.getToken() && !this.isInitialized) {
      this.websocket = new WebSocket(this.WEBSOCKET_ADDRESS + "?token=" + AuthService.getToken())
      console.log("Opened websocket with token: " + AuthService.getToken())
      this.websocket.onopen = () => {
        console.log("Websocket has been opened")
        this.isInitialized = true
      }

      this.websocket.onmessage = (message => {
        console.log("Websocket message received: ", message.data)
        if (message.data !== '__keepalive_pong__') {
          const messageObj = JSON.parse(message.data)
          this.messageEmitter.next(messageObj as TextMessage)
        }
      })

      this.websocket.onerror = (error) => console.error("An error happened: " + JSON.stringify(error))

      this.websocket.onclose = () => {
        console.log("Websocket has been closed")
        this.isInitialized = false
      }
    }
  }

  public static finalize() {
    this.websocket?.close()
  }

  public static sendMessage(username: string, message: string) {
    if (!message) {
      console.log("Empty message!")
      return
    } else if (this.isInitialized) {
      const msgObj = { recipientUsername: username, message: message }
      console.log("Sending message: ", msgObj)
      this.websocket?.send(JSON.stringify(msgObj))

    } else {
      console.log("Websocket not initialized!")
    }
  }

  public static getMessageStream(): Observable<TextMessage> {
    return MessageService.messageStream
  }

}

class Message{
  private senderId: string | undefined;
  private message: String;

  constructor(
      id: string | undefined,
      message: String
  ) {
    this.senderId = id
    this.message = message
  }
}