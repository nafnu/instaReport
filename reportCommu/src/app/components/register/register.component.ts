import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@angular/fire/storage';
import { DbService } from '../../services/db.service'
import { Firestore } from '@angular/fire/firestore'
import { Auth } from '@angular/fire/auth';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  data: User = {
    uid: null,
    lname: null,
    fname: null,
    email: null,
    phone: null, 
    city: null,
    state: null,
   street: null,
   eircode:null,
   password: null
  }

  get fname(){
    return this.registrationForm.get('fname');
  }

  get lname(){
    return this.registrationForm.get('lname');
  }
  
  get email(){
    return this.registrationForm.get('email');
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get street(){
    return this.registrationForm.get('address.street');
  }

  get city(){
    return this.registrationForm.get('address.city');
  }

  get state(){
    return this.registrationForm.get('address.state');
  }

  get eircode(){
    return this.registrationForm.get('address.eircode');
  }

  public errorMessages = {
    fname: [
      {type: 'required', message:'First name is required'},
      {type: 'maxlength', message:'Name cant be longer than 100 characters'},
    ],
    lname: [
      {type: 'required', message:'Last name is required'},
      {type: 'maxlength', message:'Last name cant be longer than 100 characters'},
    ],
    email: [
      {type: 'required', message:'Email is required'},
      {type: 'pattern', message:'Please enter a valid email address'},
    ],
    phone: [
      {type: 'required', message:'Phone number is required'},
      {type: 'pattern', message:'Please enter a valid phone number'},
    ],
    password: [
      {type: 'required', message:'Password is required'},
      {type: 'pattern', message:'Please enter a valid password. At least 8 characters in lengt.Lowercase or/and Uppercase letters. Numbers and special characters. '},
    ],
    street: [
      {type: 'required', message:'Street name is required'},
      {type: 'maxlength', message:'Street cant be longer than 100 characters'},
    ],
    city: [
      {type: 'required', message:'City is required'},
      {type: 'maxlenght', message:'City cant be longer than 100 characters'},
    ],
    state: [
      {type: 'required', message:'State is required'},
      {type: 'maxlenght', message:'State cant be longer than 100 characters'},
    ],
    eircode: [
      {type: 'required', message:'EirCode is required'},
      {type: 'minlength', message:'EirCode cant be smaller than 7 characters'},
    ]
  }

  registrationForm = this.formBuilder.group({
    fname: ['', [Validators.required, Validators.maxLength(100)]],
    lname: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-A-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      // zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
      eircode: ['', [Validators.required, Validators.minLength(7)]]
    })

  });

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController, 
    private authService: AuthService,
    private router: Router,
    //Save info connected to ID
    private db: DbService,
    private storage: Storage,
    private firestore: Firestore,
    private auth: Auth
    ) { }


  goToSignIn(){
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  ngOnInit() {}

  async register(){
    this.data = await this.registrationForm.value;
    console.log('data ->', this.data); //test the work the form

    const res = await this.authService.register(this.data).catch( error => {
      this.showAlert('Registration failed', 'Email already registed or missing information. Please try again with another email.');
    })
    if(res){
      console.log('great - works'); //check if create authentification
      const path = 'users';
      const id = res.user.uid;
      this.data.uid = id;
      this.data.password = null;
      await this.db.createDoc(this.data);
      this.showAlert('Ready Go!', 'Your profile was created');
      this.router.navigateByUrl('/home', { replaceUrl: true }); //redirect to home page
    }

  }
 
  async showAlert(header, message){
    const alert = await this.alertController.create({
      header, 
      message, 
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  public submit(){
    this.register();
  }
}
