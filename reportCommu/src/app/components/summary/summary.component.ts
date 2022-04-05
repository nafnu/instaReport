import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';

import { EmailComposer } from '@ionic-native/email-composer/ngx'


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  //variables to print in the screen
  passedIdD: string;
  lat: string;
  long: string;
  incident: string;
  notes: string;
  council: string;

  //variable to connect get user info (email, name)
  users = [];
  currentU = [];
  value: string;

  //variables to create in emailcomposer
  subject: string;
  body: string;
  to: string;

  //interfaces to save information on Firebase
  // summary: Report = {
  //   uid: null,
  //   lat: null,
  //   lng: null,
  //   imagen: null,
  //   incident: null, 
  //   description: null,
  //   authority: null,
  // }

  constructor(
    public dataService: DbService,
    public router: Router,
    public alertContrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public auth: Auth,
    public composer: EmailComposer,
    
  ) {
    //reach the users collection in firebase
    this.dataService.getUser().subscribe(res => {
      console.log(res);
      this.users = res;
    });

    this.dataService.getUserById(this.value).subscribe(res => {
      this.currentU = res;
    })
   
 
  }

 
 //check if the mobile has an app to send email //**The function sent email works but in the phone no in the emulator */
//  this.composer.isAvailable().then((available: boolean) =>{
//   if(available) {
//     this.sendEmail();
//   }
//  });

  ngOnInit() {
    this.passedIdD = this.activatedRoute.snapshot.paramMap.get('uid');
    this.lat = this.activatedRoute.snapshot.paramMap.get('lat');
    this.long = this.activatedRoute.snapshot.paramMap.get('long');
    this.incident = this.activatedRoute.snapshot.paramMap.get('data');
    this.notes = this.activatedRoute.snapshot.paramMap.get('notes');
    console.log(this.passedIdD);
    console.log(this.lat);
    console.log(this.long);
    console.log(this.incident);

    this.getConuncil();
    console.log(this.council);

   
  }

  
  //Estimate of authority/email according to long 
  getConuncil() {
    const str = this.long;
    const float = parseFloat(str);
    const fingal = -6.057170;
    const dunla = -6.244754;
    const dcity = 30.204670;

    if (float <= fingal && float < dunla && float < dcity) {
      this.council = "Fingal County Council";
      this.to = "customerservices@dublincity.ie";
    } else if (float > fingal && float <= dunla && float < dcity) {
      this.council = "Dún Laoghaire County Council";
      this.to = "info@dlrcoco.ie"
    } else if (float > fingal && float > dunla && float >= dcity) {
      this.council = "Dublin City Council";
      this.to = "customerservices@dublincity.ie";
    }
    return this.council;
  }

  getUid(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.value = uid;
        console.log(this.value); 
      }
      return ('value');
    });
  
  }
  
  
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
