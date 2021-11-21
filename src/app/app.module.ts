//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { environment } from '../environments/environment';
//services
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UtilitiesService } from '../services/utilities.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { ProposedUsersComponent, BottomSheetProposedUsers } from './proposed-users/proposed-users.component';
import { JoinComponent } from './join/join.component';
import { StatsComponent } from './stats/stats.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatComponent,
    LoginComponent,
    SidebarChatComponent,
    ProposedUsersComponent,
    JoinComponent,
    StatsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatListModule,
    MatSlideToggleModule,
    ClipboardModule,
    MatSidenavModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    ChatService,
    AuthService,
    UserService,
    AuthGuardService,
    BottomSheetProposedUsers,
    UtilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
