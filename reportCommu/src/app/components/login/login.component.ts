import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  get email(){
    return this.logingForm.get('email');
  }

  get password(){
    return this.logingForm.get('password');
  }


  public errorMessagesText = {
    email: [
      {type: 'required', message:'Email is required'},
      {type: 'pattern', message:'Please enter a valid email address'},
    ],
    password: [
      {type: 'required', message:'Password is required'},
      {type: 'pattern', message:'Please enter a valid password. At least 8 characters in lengt.Lowercase or/and Uppercase letters. Numbers and special characters. '},
    ]
  }

  constructor(public formBuilder: FormBuilder) {
    
  }


  
  logingForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-A-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]
  });

   ngOnInit() { }

   public submitLog(){
    console.log(this.logingForm.value);
  }

  

}
