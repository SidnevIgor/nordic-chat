import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import firebase from 'firebase/app';
import { User } from '../interfaces/User';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: User): Promise<void> {
    return this.db.object('/users/' + user.uid).set({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid
    });
  }
  saveWithContact(user: firebase.User, contacts: string[]): Promise<void> {
    return this.db.object('/users/' + user.uid).set({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      contacts: [...contacts]
    })
  }
  get(uid: string): AngularFireObject<any> {
    return this.db.object('/users/'+uid);
  }
  getAll(): AngularFireList<firebase.User> {
    return this.db.list('/users/');
  }
}
