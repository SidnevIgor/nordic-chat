import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from "src/theme/theme.service";
import { BottomSheetProposedUsers } from '../proposed-users/proposed-users.component';
import { Subscription } from "rxjs";

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    private proposedSheet: BottomSheetProposedUsers,
    private themeService: ThemeService
    ) { }
  ngOnInit() {
    this.subs.push(
      this.themeService.theme$.subscribe((theme) => {
        this.theme = theme;
      })
    )
  }
  ngOnDestroy() {
    this.subs.forEach((sub) => sub?.unsubscribe());
  }  
  @Input() participants = [];
  @Input() chatId = "";
  @Output() selectChat = new EventEmitter();
  @Output() toggleSidenav = new EventEmitter();
  theme: string;
  subs: Subscription[] = []; 

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
