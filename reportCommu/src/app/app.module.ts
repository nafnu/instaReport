import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';

//Angular forms validation
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

//Components imports
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LocationComponent } from './components/location/location.component';
import { RestartComponent } from './components/restart/restart.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TypeComponent } from './components/type/type.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SplashComponent } from './components/splash/splash.component';
import { ModalMapComponent } from './components/modal-map/modal-map.component';
import { HistoryReportComponent } from './components/history-report/history-report.component';

//Native imports from android
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

//For sent email
import { EmailComposer } from '@ionic-native/email-composer/ngx'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    LocationComponent,
    RestartComponent,
    SummaryComponent,
    TypeComponent,
    LoginComponent,
    RegisterComponent,
    SplashComponent,
    HistoryReportComponent,
    ModalMapComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule,ReactiveFormsModule, RxReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()), provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()), provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    EmailComposer,
    Camera,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}

