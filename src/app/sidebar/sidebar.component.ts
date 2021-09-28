import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BottomSheetProposedUsers } from '../proposed-users/proposed-users.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private proposedSheet: BottomSheetProposedUsers) { }
  @Input() participants = [];
  @Input() chatId = "";
  @Output() selectChat = new EventEmitter();
  @Output() toggleSidenav = new EventEmitter();

  selectPerson = (chatId) => {
    this.selectChat.emit(chatId);
  }
  toggleSidebar = () => {
    this.toggleSidenav.emit();
  }
  openProposedUsers = () => {
    this.proposedSheet.openBottomSheet();
  } 
}
