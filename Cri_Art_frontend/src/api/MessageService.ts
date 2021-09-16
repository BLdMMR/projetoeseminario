import {Dispatch, SetStateAction} from "react";
import {AuthService} from "./AuthService";
import Chat from "../chat/Chat";
import {Observable, Subject} from "rxjs";


export class MessageService {

    private static readonly WEBSOCKET_ADDRESS = "wss://cri-art.herokuapp.com/api/echo"

    //private static readonly WEBSOCKET_ADDRESS = "ws://localhost:8080/api/echo"

    private static websocket: WebSocket

    private static readonly messageEmitter: Subject<string> = new Subject()

    public static initialize() {
        if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {

            this.websocket = new WebSocket(this.WEBSOCKET_ADDRESS + "?token=" + AuthService.getToken())

            this.websocket.onmessage = (message => {
                this.messageEmitter.next(message.data)
            })
        }
    }

    public static finalize() {
        this.websocket?.close()
    }

    public static sendMessage(message: string) {
        this.websocket.send(message)
    }

    public static getMessageStream(): Observable<string> {
        return MessageService.messageEmitter.asObservable();
    }

}