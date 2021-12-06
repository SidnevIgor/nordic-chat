import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(public auth: AngularFireAuth) {
    this.user$ = auth.authState;
  }
  loginWithEmailAndPass(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  loginWithEmail(): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginWithLink() {
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  signUpWithEmailAndPass(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  logout() {
    this.auth.signOut();
  }
}
