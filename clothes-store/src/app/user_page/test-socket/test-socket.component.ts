import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-socket',
  imports: [ReactiveFormsModule],
  templateUrl: './test-socket.component.html',
  styleUrl: './test-socket.component.css'
})
export class TestSocketComponent {

  scheduleForm: FormGroup
  
  messages: string[] = [];

  constructor(private fb: FormBuilder){

    this.scheduleForm = this.fb.group({
      message: [""]
    })

  }



  sendMessage(){

  }

}
