import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SocketService } from '../../../services/socket.service';
import { merge, Observable, scan, startWith, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-test-socket',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './test-socket.component.html',
  styleUrl: './test-socket.component.css'
})
export class TestSocketComponent {

  socketService = inject(SocketService);



  scheduleForm: FormGroup;
  
  messages$ = merge( // combine multiple observables
    this.socketService.getAllServices(),
    this.socketService.onServiceCreated(),
    this.socketService.onServiceDeleted()
  ).pipe(
      startWith([]), // start with an empty array
      scan((acc, curr) => { // like the reduce, accumulate the results over time
        console.log(curr)
        if(Array.isArray(curr)) return curr;
        else if(typeof curr === 'object') return [...acc, curr];
        else return acc.filter((item: any) => item.idtest !== curr);

      })
    );



  constructor(private fb: FormBuilder){

    this.scheduleForm = this.fb.group({
      service: [""],
      price: [""]
    })

  }




  sendMessage(){
    this.socketService.createService(100, 'vini')
  }

  deletingService(id: number){
    this.socketService.deleteService(id);
  }

 



}
