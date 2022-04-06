import { Component, OnInit } from '@angular/core';

import { EmailComposer } from '@ionic-native/email-composer/ngx'


@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.scss'],
})
export class RestartComponent implements OnInit {

    //variables to create in emailcomposer
    subject: string;
    body: string;
    to: string;
    
  constructor(
    public composer: EmailComposer,
  ) { }

   //check if the mobile has an app to send email //**The function sent email works but in the phone no in the emulator */
//  this.composer.isAvailable().then((available: boolean) =>{
//   if(available) {
//     this.sendEmail();
//   }
//  });
  ngOnInit() {}

    
  /*** Part to send email */
  
  // sendEmail(){
  //   //The notes of the user are part in the body
  //   this.body = this.notes;

  //      //check if the mobile has an app to send email //**The function sent email works but in the phone no in the emulator */
  //      this.composer.isAvailable().then(function() {
  //       console.log("email available");
  //         }, function() {
  //       console.log("email not availabl");
  //     });

  //    let email = {
  //     to: '21520@student.dorset-college.ie  ',  //this.to //**but not implement coz it is a student project */
  //     // cc: 'nafnu@hotmail.com', 
  //     // bcc: ['john@doe.com', 'jane@doe.com'],
  //     // attachments: [
  //     //   'file://img/logo.png',
  //     //   'res://icon.png',
  //     //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
  //     //   'file://README.pdf'
  //     // ],
  //     subject: 'Test Email Ionic',  //this.incident
  //     body: 'How are you? I am sending this message in order to resolve a problem.', //this.body
  //     isHtml: true, 
  //     app:"Gmail"
  //   };
  //   this.composer.open(email);

    
  // }


}
