import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";

@Injectable({
    providedIn: 'root'
})


export class TestSocketService {

    private api = environment.api


    getAllMessages(){
        
    }

}