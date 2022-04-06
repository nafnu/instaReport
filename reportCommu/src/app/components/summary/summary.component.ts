import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService, User } from 'src/app/services/db.service';
import { Report } from 'src/app/models/models';

import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";


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
  note: string;
  council: string;
  imagen: string;

  //variable to connect get user info (email, name)
  user: User = null;
  users = [];


  summary = [];

  //variables to create in emailcomposer
  subject: string;
  body: string;
  to: string;

  //interfaces to save information on Firebase
   report: Report = {
    reportId: null,
     uid: null,
     lat: null,
     lng: null,
     imagen: null,
     description: null,
     authority: null,
     incident: null,
  }

   reportForm: FormGroup;

  constructor(
    public dataService: DbService,
    public router: Router,
    public alertContrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public auth: Auth,
    public formBuilder: FormBuilder
  ) {
    //reach the users collection in firebase
    this.dataService.getUser().subscribe(res => {
      console.log(res);
      this.users = res;
    });

    this.dataService.getReports().subscribe(res => {
      console.log(res);
      this.summary = res;
    })


  }




  ngOnInit() {
    this.passedIdD = this.activatedRoute.snapshot.paramMap.get('uid');
    this.lat = this.activatedRoute.snapshot.paramMap.get('lat');
    this.long = this.activatedRoute.snapshot.paramMap.get('long');
    this.incident = this.activatedRoute.snapshot.paramMap.get('data');
    this.note = this.activatedRoute.snapshot.paramMap.get('pass');
    console.log(this.passedIdD);
    console.log(this.lat);
    console.log(this.long);
    console.log(this.incident);
    console.log(this.note);  // Error to carry the note

    this.getConuncil();
    console.log(this.council);
    console.log(this.to);


    this.getUid();

    this.getUserInfo();

    this.reportForm = this.formBuilder.group({ 
      council: ['', [Validators.required, Validators.maxLength(100)]],
      incident: ['', [Validators.required, Validators.maxLength(100)]],
      lat: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      long: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });

  }


  //Estimate of authority/email according to long 
  getConuncil() {
    const str = this.long;
    const float = parseFloat(str);
    const dunla = -6.244754;
    const dcity = 30.204670;

    const str2 = this.lat;
    const float2 = parseFloat(str2);
    const dunlaL = 53.291676;
    const dcityL = 55.184590;

    if (float <= dunla) {
      this.council = "Dún Laoghaire County Council";
      this.to = "info@dlrcoco.ie"
    } else if (float <= dcity) {
      this.council = "Dublin City Council";
      this.to = "customerservices@dublincity.ie";
    }


  }

  getUid(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.passedIdD = uid;
        console.log(this.passedIdD);
      }
      return ('id');
    });

  }

  getUserInfo() {

    // this.dataService.getUser().subscribe(res => {
    //     console.log(res);
    //     this.users = res;
    //   });

    this.activatedRoute.params.subscribe(params => {
      this.passedIdD = params['id'];
      this.dataService.getUserById(this.passedIdD).subscribe(res => {
        this.user = res;
        console.log(this.user);
      })
    })

  }

  async saveRegister(){
    // this.report = await this.reportForm.value;
    console.log(this.report); 

    this.report.authority = this.council;
    this.report.description= "this.note";
    this.report.uid = this.passedIdD;
    this.report.lat = parseInt(this.lat);
    this.report.lng = parseInt(this.long);
    this.report.incident = this.incident;
    this.report.imagen = "this.imagen";
       
    await this.dataService.createReport(this.report);
    
  }
}
