import { Component, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/Message';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  constructor(private chatService: ChatService) {}

  message: string = "";
  @Input() messages;
  @Input() userId;
  @Input() chatId;

  messageChange = (event: any) => {
    this.message = event.target.value;
  }
  addNewMessage = () => {
    this.chatService.addMessage(this.chatId, this.userId, this.message);
  }
}
