import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from '../../interfaces/User';
import { ThemeService } from "src/theme/theme.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  constructor(
    private chatService: ChatService,
    private themeService: ThemeService) {}
  ngOnInit() {
    this.subs.push(
      this.themeService.theme$.subscribe((theme) => {
        this.theme = theme;
      })
    )
  }
  ngAfterViewChecked() {
    this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
  }
  ngOnDestroy() {
    this.subs.forEach((sub) => sub?.unsubscribe());
  }
  @ViewChild("messagesContainer") messagesContainer: ElementRef;
  message: string = "";
  @Input() participant: User;
  @Input() messages;
  @Input() userId;
  @Input() chatId;
  @Input() sideNavOpened;
  @Output() toggleSidenav = new EventEmitter();
  theme: string;
  subs: Subscription[] = []; 

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
