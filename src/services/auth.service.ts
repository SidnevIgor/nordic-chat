import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(public auth: AngularFireAuth) {
    this.user$ = auth.authState;
  }
  loginWithEmail() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginWithLink() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut()
  }
}
