import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    let userId = localStorage.getItem("userId");
    if(userId) {
      userService.get(userId).valueChanges().subscribe((user$) => {this.user = user$});
    }
    else {
      authService.user$.subscribe(user => {
        if(user) {
          console.log("Got a user", user);

          userService.save(user).then(() => {
            userService.get(user.uid).valueChanges().subscribe((user$) => {this.user = user$});
          });
        }
      });
    }
  }
  user: firebase.User;
}
