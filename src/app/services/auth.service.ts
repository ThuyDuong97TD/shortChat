import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Subject<any> = new Subject<any>();
  constructor(private auth: Auth) { }
  onAuthStateChanged(){
    this.auth.onAuthStateChanged((user)=>{
      this.user$.next(user);
    })
  }
  login(){
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider);
  }
  logout(){
    this.auth.signOut();
  }
}
