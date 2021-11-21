import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { User } from '../../interfaces/User';
import firebase from 'firebase/app';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
    private chatService: ChatService,
    private _snackBar: MatSnackBar
  ) {}
  userId: string = localStorage.getItem("userId") || '';
  inviteLink: string = `http://localhost:4200/join/${this.userId}`;

  createChat(userB) {
    let userId = localStorage.getItem("userId");
    this.userService.get(userId).valueChanges().subscribe((userA) => {
      this.chatService.addChat(userA, userB);
    })
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  openSnackBar() {
    this._snackBar.open('Link copied to the clipboard', 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }
}
