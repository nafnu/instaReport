import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent implements OnInit {

  location = null;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.location = this.navParams.get("custome_id");
    console.log(this.location);
  }

  closeModal(){
    
    this.modalCtrl.dismiss();
  }

}
