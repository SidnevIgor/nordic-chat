import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService) {}
  ngOnInit() {
    console.log(this.chatId);
  }

  message: string = "";
  @Input() participant: User;
  @Input() messages;
  @Input() userId;
  @Input() chatId;
  @Input() sideNavOpened;
  @Output() toggleSidenav = new EventEmitter();

  messageChange = (event: any) => { 
    this.message = event.target.value;
  }
  addNewMessage = () => {
    if(this.message.length > 0) {
      this.chatService.addMessage(this.chatId, this.userId, this.message)
      .then(() => {
        this.message = "";
      })
    }
  }
  toggleSidebar = () => {
    this.toggleSidenav.emit();
  }
}
