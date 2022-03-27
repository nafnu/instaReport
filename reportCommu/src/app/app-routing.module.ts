import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LocationComponent } from './components/location/location.component';
import { RestartComponent } from './components/restart/restart.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TypeComponent } from './components/type/type.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SplashComponent } from './components/splash/splash.component';
import { HistoryReportComponent } from './components/history-report/history-report.component';

import{ redirectUnauthorizedTo, redirectLoggedInTo, canActivate, AuthGuard } from '@angular/fire/auth-guard';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {path:'', component:SplashComponent},
  
  {path:'login', component:LoginComponent,
  ...canActivate(redirectLoggedInToHome)},

  {path:'register', component:RegisterComponent,
  ...canActivate(redirectLoggedInToHome)},
  
  {path:'home', component:HomeComponent,
  ...canActivate(redirectUnauthorizedToLogin)},

  {path:'location/:uid', component: LocationComponent},

  {path:'type/:uid/:lat/:long', component: TypeComponent},

  {path:'details/:uid/:lat/:long/:data', component: DetailsComponent},

  {path:'summary/:uid/:lat/:long/:data/:note', component:SummaryComponent},
  
  {path:'restart', component:RestartComponent},
 
  {path:'history', component:HistoryReportComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
