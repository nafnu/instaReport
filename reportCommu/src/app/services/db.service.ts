import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { collectionData, Firestore, doc, getFirestore ,addDoc, collection, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { Photo } from '@capacitor/camera';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { uploadString } from 'firebase/storage';



export interface Type{
  id: number;
  incident: string
  options: {
      a: string, 
      b: string, 
      c: string
    }
}

export interface User {
  uid?: string;
  lname: string;
  fname: string;
  email: string;
  phone: number; 
  city: string;
  state: string;
 street: string;
 eircode:string;
 password: string
}


@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private firestore: Firestore, 
    private auth: Auth,
    private storage: Storage ) {  }

  //Add user - with authentificacion email/password - also add as collection with uid
  createDoc(user: User): Promise<void>{
    const group = doc(collection(this.firestore, 'users'));
    return setDoc(group, user);
  }

  //Get incident type form the Firebase
  getType(): Observable<Type[]> {
    const typeRef = collection(this.firestore, 'type');
    return collectionData(typeRef, { idField: 'idField'}) as Observable<Type[]>;
  }

   //Get incident type by Id form the Firebase
  getTypeById(id): Observable<Type> {
    const typeRef = doc(this.firestore, `type/${id}`);
    return docData(typeRef, { idField: 'idField'}) as Observable<Type>;
  }

  // //Get the current user and the firebase reference
  // getUserProfile(){
  //   const user = this.auth.currentUser;
  //   const userDocRef = doc(this.firestore, `users/${user.uid}`);
  //   return docData(userDocRef);
  // }

  //Uload images to firebase storage
  async uploadImage(cameraFile: Photo){
    const report = this.auth.currentUser;
    const path = `uploads/${report.uid}/problem.png`;
    const storageRef = ref(this.storage,path);

    try{
      await uploadString(storageRef, cameraFile.base64String, 'base64'); //put the image in the storage

      const imageUrl = await getDownloadURL(storageRef); //get the url of the image

      const userDocRef = doc(this.firestore, `reports/${report.uid}`);
     
      await setDoc(userDocRef, {
        imageUrl, 
      });

      return true;

    }catch(e){
      return null;
    }
  }


    


}
