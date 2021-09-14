import firebase from 'firebase/app';

export interface User extends firebase.User {
  uid: string;
  displayName: string;
  email: string;
  chatId?: string;
  contacts?: string[];
}
