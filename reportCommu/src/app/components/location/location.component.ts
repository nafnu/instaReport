import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

//Map find location
import { ModalController } from '@ionic/angular';
import { ModalMapComponent } from '../modal-map/modal-map.component';

//Camera find location
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as watermark from 'watermarkjs';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  passedId:string;
  lat:number;
  long:number;
 
  @ViewChild('waterMarkedImage') waterMarkImage: ElementRef;
 
  originalImage = null;
  blobImage = null;
  locationCordinates:any;
  loadingLocation:boolean;

  value = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private camera: Camera,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute
  ) {
    this.getLatLong();
   }

  ngOnInit() {
    this.passedId = this.activatedRoute.snapshot.paramMap.get('uid');
    console.log(this.passedId);
  }

  //camera
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  }

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      this.originalImage = 'data:image/jpeg;base64,' + imageData;
 
      fetch(this.originalImage)
        .then(res => res.blob())
        .then(blob => {
          this.blobImage = blob;
          this.watermarkImage()
        });
    }, (error) => {
       console.log(error);      
    });
  }

  getLatLong() {
    this.loadingLocation = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log(resp);
      this.locationCordinates = resp.coords;
      this.loadingLocation = false;

       //Assigne the latitude and long
       this.lat = resp.coords.latitude;
       this.long = resp.coords.longitude;
       console.log(this.lat, this.long);
       
    }).catch((error) => {
      this.loadingLocation = false;
      console.log('Error getting location', error);
    });
  }

  watermarkImage() {
    watermark([this.blobImage])
    .image(watermark.text.lowerLeft("("+this.locationCordinates.latitude+", "+this.locationCordinates.longitude+")", '100px Arial', '#F5A905', 0.8))
      .then(img => {
        this.waterMarkImage.nativeElement.src = img.src;
      });
  }

  //open map
  async openModalMap(){
    const modal = await this.modalCtrl.create({
    component: ModalMapComponent, 
    componentProps: {
      custome_id: this.value
    }
    });
    modal.present();
  }
 

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
  
}
