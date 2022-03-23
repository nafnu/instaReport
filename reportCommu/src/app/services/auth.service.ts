import { Injectable } from '@angular/core';
import {  Firestore } from '@angular/fire/firestore';
import { User } from '../models/models';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
    ) { }

  //Allow to register unique users by emails and password. With unique ID ***Feature security
  async register(data: User){
    return await createUserWithEmailAndPassword(this.auth,data.email, data.password);
  }

  //Allow to login unique users by emails and password. ***Feature security
  async login(email:string, password:string){
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }
 
}

