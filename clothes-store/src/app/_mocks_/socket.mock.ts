
import { Subject } from "rxjs";

// for real-time events without real connections

export class MockService{

    private events = new Map<string, Subject<any>>();

    on(event: string, callback: (data: any) => void) {
        if (!this.events.has(event)) {
        this.events.set(event, new Subject<any>());
        }
        this.events.get(event)!.subscribe(callback);
    }

    emit(event: string, data: any) {
        if (!this.events.has(event)) {
        this.events.set(event, new Subject<any>());
        }
        this.events.get(event)!.next(data);
    }
}
