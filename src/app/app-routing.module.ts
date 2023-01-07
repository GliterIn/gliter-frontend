import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeRightBackComponent } from './components/be-right-back/be-right-back.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path : 'feed' , title:'Feed', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin} ,component : FeedComponent},
  {path : 'onboarding' , title:'Onboarding', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},  component : OnboardingComponent},
  {path : 'login' , title:'Login', component : LoginComponent},
  {path : 'logout' , title:'Logged Out', component : LogoutComponent},
  {path : 'brb' , title:'Coming Soon !', component : BeRightBackComponent},
  {path : 'profile/:username' , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin} ,component : ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
