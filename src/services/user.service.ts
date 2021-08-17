import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User): Promise<void> {
    return this.db.object('/users/' + user.uid).set({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid
    });
  }
  get(uid: string): AngularFireObject<firebase.User> {
    return this.db.object('/users/'+uid);
  }
  getAll(): AngularFireList<firebase.User> {
    return this.db.list('/users/');
  }
}
