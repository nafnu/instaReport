import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService, Report } from 'src/app/services/db.service';
// import { Report } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { getAuth, onAuthStateChanged  } from "firebase/auth";


@Component({
  selector: 'app-history-report',
  templateUrl: './history-report.component.html',
  styleUrls: ['./history-report.component.scss'],
})
export class HistoryReportComponent implements OnInit {

  reports = [];

  id: string;
value: string;

  report: Report = null;
  
  constructor(
    private dataService: DbService, 
    public router: Router, 
    private alertContrl: AlertController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) { 
    this.dataService.getReports().subscribe(res => {
      this.reports = res;

         
    // if (this.value == this.report.uid ){
      
    // }
    });
    
      
  }

  async summary(){

  }

  ngOnInit() {
    this.getUid();
    
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

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

  goToHome(){
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}