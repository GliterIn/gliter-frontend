import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfilePageAboutComponent } from './components/profile-page-about/profile-page-about.component';
import { BeRightBackComponent } from './components/be-right-back/be-right-back.component';
import { InvestorsComponent } from './components/investors/investors.component';
import { AboutComponent } from './components/about/about.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { FeedComponent } from './components/feed/feed.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path : 'feed' , title:'Feed', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin} ,component : FeedComponent},
  {path : 'onboarding' , title:'Onboarding', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},  component : OnboardingComponent},
  {path : 'login' , title:'Login', component : LoginComponent},
  // {path : 'profile/:username/edit' , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin} , component : EditProfileComponent},
  {path : 'profile/:username/about' , component : ProfilePageComponent },
  {path : 'profile/:username/followers' , component : ProfilePageComponent },
  {path : 'profile/:username/following' , component : ProfilePageComponent },
  {path : 'logout' , title:'Logged Out', component : LogoutComponent},
  {path : 'brb' , title:'Coming Soon !', component : BeRightBackComponent},
  {path : 'investors' , title:'Investors', component : InvestorsComponent},
  {path : 'about' , title:'About Gliter', component : AboutComponent},
  {path : 'profile/:username', component : ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
