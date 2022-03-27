import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AlertController } from '@ionic/angular';
import { DbService, Type} from 'src/app/services/db.service';

//Camera find location
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  @Input() id: string;
  type: Type = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private db: DbService, 
    private alertContrl: AlertController,
  ) { }

  ngOnInit() {}

  ///**** CAPTURE IMAGE */
  
title = 'angularCapacitor'; 
image = '';
async captureImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
    });
  }
  if(image){
    this.image = `data:image/jpeg;base64,${image.base64}`!;
  }

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

}
