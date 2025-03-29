import { Injectable, signal } from "@angular/core";
import { Message, MessageSeverity } from "../modules/message.module";


@Injectable({
    providedIn: 'root'
})

export class MessageService{

    #messageSignal = signal<Message | null>(null)

    message = this.#messageSignal.asReadonly()

    showMessage(text: string, severity: MessageSeverity){
        this.#messageSignal.set({
            text, severity
        })

        setTimeout(() =>{ // desativating pop up
            this.#messageSignal.set(null)
        }, 3000)

    }

    clear(){
        this.#messageSignal.set(null)
    }

}

