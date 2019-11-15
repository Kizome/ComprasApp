import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private ActivatedRouter: ActivatedRoute) {
    
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async registroUsuario(userdata) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(userdata.email, userdata.password);
    return this.updateUserData(credential.user);

  }

  private updateUserData(user) {
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`usuario/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })
  }

  inicioSesion(userdata) {    
    return firebase.auth().signInWithEmailAndPassword(userdata.email,
      userdata.password)
      
  }
  isAuthenticated() {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    return firebase.auth().signOut();
  }

}
