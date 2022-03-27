import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


//Camera find location
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  note: string;

  passedIdD: string;
  lat: string;
  long: string;
  incident: string;


  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    console.log(this.note);
  }

  getNotes(ev: CustomEvent){
    this.note = ev.detail.value;
    console.log(this.note);
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
