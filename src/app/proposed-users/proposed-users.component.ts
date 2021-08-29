import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { User } from '../../interfaces/User';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetProposedUsers {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(ProposedUsersComponent);
  }
}

@Component({
  selector: 'proposed-users',
  templateUrl: './proposed-users.component.html',
  styleUrls: ['./proposed-users.component.scss']
})
export class ProposedUsersComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ProposedUsersComponent>,
    private userService: UserService,
    private chatService: ChatService
  ) {
    this.userService.getAll().valueChanges().subscribe((users) => {
      this.proposedUsers = users;
    })
  }
  proposedUsers: firebase.User[] = [];
  inviteLink: string = "test inv link";

  createChat(userB) {
    let userId = localStorage.getItem("userId");
    this.userService.get(userId).valueChanges().subscribe((userA) => {
      this.chatService.addChat(userA, userB);
    })
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
