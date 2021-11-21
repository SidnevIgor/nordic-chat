import { Injectable } from '@angular/core';
import { Chat } from '../interfaces/Chat';
import { User } from '../interfaces/User';
import { Message } from '../interfaces/Message';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase, private af: AngularFirestore) { }

  public getAllChats(): AngularFireList<Chat> {
    return this.db.list('/chats/');
  }

  public getMyParticipants(userId: string, chats: Chat[]): User[] {
    let myParticipants: Array<User> = [];
    for(let chat of chats) {
      for(let j=0; j < chat.participants.length; j++) {
        if(chat.participants[j].uid !== userId) {
          var participant = chat.participants[j];
          participant.chatId = chat.id;
          myParticipants.push(participant);
        }
      }
    }
    return myParticipants;
  }
  public getChatParticipants(chatId: string): AngularFireList<User> {
    console.log("Func is called - ", chatId);
    return this.db.list('/chats/' + chatId + '/participants/');
  }
  public getMessagesByChat(chats: Chat[], currentChatId: string): Message[] {
    let messages = chats.find((chat) => chat.id == currentChatId).messages;
    return messages;
  }
  public addChat(userA: User, userB: User) {
    let chatId = this.af.createId();
    return this.db.object('/chats/' + chatId).set({
      participants: [userA, userB],
      messages: [],
      id: chatId
    })
  }
  public addMessage(chatId, userId, message) {
    return this.db.list('/chats/' + chatId + '/messages/').push({
      text: message,
      userId: userId,
      chatId: chatId,
      created: new Date().toString()
    })
  }
  public cleanMessages() {
    
  }
}
