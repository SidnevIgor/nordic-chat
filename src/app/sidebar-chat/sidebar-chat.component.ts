import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

import { ChatService } from '../../services/chat.service';
import { UtilitiesService } from '../../services/utilities.service';

import { Chat } from '../../interfaces/Chat';
import { Message } from '../../interfaces/Message';
import { User } from '../../interfaces/User';

@Component({
  selector: 'sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrls: ['./sidebar-chat.component.scss']
})
export class SidebarChatComponent {

  currentChatId: string = "";
  currentParticipant: User;
  userId = localStorage.getItem("userId");
  chats: Array<Chat> = [];
  messages: Array<Message> = [];
  participants: Array<User> = [];
  sideNavOpened: boolean = true;

  constructor(private chatService: ChatService, private utiService: UtilitiesService) {
    if(this.userId) {
      let chatsTemp = [];
      this.chatService.getAllChats().valueChanges().subscribe((chats$) => {
        chats$.forEach((chat: Chat) => {
          let chatSelect = false;
          chat.participants.forEach((user) => {
            if(user.uid == this.userId) {
              chatSelect = true;
            }
          });
          if(chatSelect) {
            chatsTemp.push(chat);
          }
        });
        this.chats = [...chatsTemp];
        chatsTemp = [];
        if(this.chats.length > 0) {
          this.currentChatId = this.currentChatId.length > 0 ? this.currentChatId: this.chats[0].id;
          this.messages = this.utiService.convertObjToArr(this.chatService.getMessagesByChat(this.chats, this.currentChatId));
          this.participants = this.chatService.getMyParticipants(this.userId, this.chats);
          this.chatService.getChatParticipants(this.currentChatId).valueChanges()
          .subscribe((users) => {
            console.log("Got users: ", users);
            this.currentParticipant = users.find((user) => user.uid != this.userId);
          })
        }
      });
    }
  }
  onChatSelection = (person) => {
    this.currentChatId = person.chatId;
    this.messages = this.utiService.convertObjToArr(this.chats.find((chat) => chat.id == person.chatId).messages);
    this.currentParticipant = person;
  }
  onSidenavToggle = () => {
    this.sideNavOpened = !this.sideNavOpened;
  }
}
