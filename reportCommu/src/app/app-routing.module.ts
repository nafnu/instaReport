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
import{ redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { SplashComponent } from './components/splash/splash.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {path:'', component:SplashComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'location', component: LocationComponent},
  {path:'type', component: TypeComponent},
  {path:'details', component: DetailsComponent},
  {path:'summary', component:SummaryComponent},
  {path:'restart', component:RestartComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
