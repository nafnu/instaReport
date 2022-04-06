import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from '@rxweb/reactive-form-validators';


//Camera find location
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  pass: string;

  passedIdD: string;
  lat: string;
  long: string;
  incident: string;

  detailsForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.passedIdD = this.activatedRoute.snapshot.paramMap.get('uid');
    this.lat = this.activatedRoute.snapshot.paramMap.get('lat');
    this.long = this.activatedRoute.snapshot.paramMap.get('long');
    this.incident = this.activatedRoute.snapshot.paramMap.get('data');
    console.log(this.passedIdD);
    console.log(this.lat);
    console.log(this.long);
    console.log(this.incident);

    this.detailsForm = this.formBuilder.group({ 
      notes: ['', [Validators.required, ]],
      files:['', RxwebValidators.file({minFiles:1, maxFiles:2 })], 
    });

    this.description();
  }

  get notes(){
    return this.detailsForm.get('notes');
  }

  public errorMessages = {
    notes: [
      {type: 'required', message:'Description is required'},
      {type: 'pattern', message:'Please enter a valid notes'},
    ],
    // files: [
    //   {type: 'required', message:'At least 1 image is required'},
    //   {type: 'pattern', message:'Please enter a valid image '},
    // ]
  }

  async description(){
    this.pass = await this.detailsForm.get('notes').value;
    console.log(this.pass); //test the work the form

  
  }

  // getNotes(ev: CustomEvent) {
  //   this.note = ev.detail.value;
  //   console.log(this.note);
  // }

  public submitDetails() {

  }

  ///**** CAPTURE IMAGE */

  title = 'angularCapacitor';
  image = '';
  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });
  }
  if(image) {
    this.image = `data:image/jpeg;base64,${image.base64}`!;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }



}
