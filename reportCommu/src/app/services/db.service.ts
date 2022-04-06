import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { collectionData, Firestore, doc, getFirestore, addDoc, collection, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { Photo } from '@capacitor/camera';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { uploadString } from 'firebase/storage';



export interface Type {
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
  eircode: string;
  password: string
}

export interface Report {
  id?: string;
  uid?: string;
  lat: number;
  lng: number;
  imagen: string;
  incident: string;
  description: string;
  authority: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: Storage) { }


  //Add user - with authentificacion email/password - also add as collection with uid
  createDoc(user: User): Promise<void> {
    const group = doc(collection(this.firestore, 'users'));
    return setDoc(group, user);
  }

  //Get incident type from the Firebase
  getType(): Observable<Type[]> {
    const typeRef = collection(this.firestore, 'type');
    return collectionData(typeRef, { idField: 'idField' }) as Observable<Type[]>;
  }

  //Get incident type by Id from the Firebase
  getTypeById(id): Observable<Type> {
    const typeRef = doc(this.firestore, `type/${id}`);
    return docData(typeRef, { idField: 'idField' }) as Observable<Type>;
  }

  //Get user from the Firebase
  getUser(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  //Get user by Id from the Firebase
  getUserById(id): Observable<User> {
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef, { idField: 'idfield' }) as Observable<User>;
  }

    //Report seccion

  //Get report history  from the Firebase
  getReports(): Observable<Report[]> {
    const reportRef = collection(this.firestore, 'reports');
    return collectionData(reportRef, { idField: 'id' }) as Observable<Report[]>;
  }

  //Get report history by Id from the Firebase
  getReportById(id): Observable<Report> {
    const reportRef = doc(this.firestore, `reports/${id}`);
    return docData(reportRef, { idField: 'id' }) as Observable<Report>;
  }
  createReport(report: Report): Promise<void> {
    const group = doc(collection(this.firestore, 'reports'));
    return setDoc(group, report);
  }

  deleteReport(report: Report): Promise<void> {
    const reportDocRef = doc(this.firestore, `reports/${report.id}`);
    return deleteDoc(reportDocRef);
  }

  //Uload images to firebase storage
  async uploadImage(cameraFile: Photo) {
    const report = this.auth.currentUser;
    const path = `uploads/${report.uid}/problem.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64'); //put the image in the storage

      const imageUrl = await getDownloadURL(storageRef); //get the url of the image

      const userDocRef = doc(this.firestore, `reports/${report.uid}`);

      await setDoc(userDocRef, {
        imageUrl,
      });

      return true;

    } catch (e) {
      return null;
    }
  }





}
