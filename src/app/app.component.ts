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
  constructor() {}
}
