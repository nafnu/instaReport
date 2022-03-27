import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

import { Auth } from '@angular/fire/auth';

import { EmailComposer } from '@ionic-native/email-composer/ngx'


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  passedIdD: string;
  lat: string;
  long: string;
  incident: string;
  notes: string;

  council: string;

  users = [];


  // summary: Report = {
  //   uid: null,
  //   lat: null,
  //   lng: null,
  //   imagen: null,
  //   incident: null, 
  //   description: null,
  //   authority: null,
  // }

  usermailData = {
    username:'',
    email:'',  //user email address to send email 
    date:'',
    mesage:''
  }
  constructor(
    public dataService: DbService,
    public router: Router,
    public alertContrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public auth: Auth,
    public composer: EmailComposer,
    
  ) {
    // this.dataService.getType().subscribe(res => {
    //   console.log(res);
    //   this.users = res;
    // });

    this.composer.isAvailable().then((available: boolean) =>{
      if(available) {
        this.sendEmail();
      }
     });
  }

  openUser(incident) { }

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
    // : number = -6.2217166;
    console.log(this.council);

   
  }


  getConuncil() {
    this.long;

    const fingal: string = "-6.057170";
    const dunla: string = "-6.244754";
    const dcity: string = "30.204670";

    if (this.long <= fingal && this.long < dunla && this.long < dcity) {
      this.council = "Fingal County Council";
    } else if (this.long > fingal && this.long <= dunla && this.long < dcity) {
      //this.council = "Dún Laoghaire County Council";
    } else if (this.long > fingal && this.long > dunla && this.long >= dcity) {
      this.council = "Dublin City Council";
    }
    return this.council;
  }

  /*** part to send email */

  
  sendEmail(){
     let email = {
      to: '21520@student.dorset-college.ie  ',
      cc: 'nafnu@hotmail.com',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Test Email Ionic',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true, 
      app:"Gmail"
    };
    this.composer.open(email);

    
  }


}
