import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgClass], 
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  messageService = inject(MessageService)

  message = this.messageService.message;

}
