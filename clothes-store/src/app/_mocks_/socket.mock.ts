
import { Socket } from "ngx-socket-io";
import { Observable, Subject } from "rxjs";

// for real-time events without real connections

export class MockService extends Socket{

    private eventSubject = new Map<string, Subject<any>>()

    constructor() {
        super(
            {url: '', options: {}}  as any
        ),

        (this as any).ioSocket = {
            on: (eventName: string, callback: (value: any) => void) => {
                if (!this.eventSubject.has(eventName)) {
                    this.eventSubject.set(eventName, new Subject<any>());
                }

                this.eventSubject.get(eventName)!.subscribe(callback);
            },
            emit: (eventName: string, value: any) => {
                this.eventSubject.get(eventName)?.next(value);
            }
        }
    }


    emitEvent<T>(eventName: string, value: T){
        this.eventSubject.get(eventName)?.next(value)
    }


}
