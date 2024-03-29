import { Component, NgModule, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { JoinComponent } from './join/join.component';
import { StatsComponent } from './stats/stats.component';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  { path: '', component: SidebarChatComponent, canActivate: [AuthGuardService] },
  { path:'login', component: LoginComponent },
  { path: 'join/:id', component: JoinComponent },
  { path: 'stats', component: StatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
