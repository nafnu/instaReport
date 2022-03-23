import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AlertController } from '@ionic/angular';
import { DbService, Type} from 'src/app/services/db.service';
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
    private alertContrl: AlertController
  ) { }

  ngOnInit() {}

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

}
