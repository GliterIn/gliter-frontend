import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {path : 'feed' , component : FeedComponent},
  {path : 'login' , component : LoginComponent},
  {path : 'signup' , component : SignUpComponent},
  {path : 'logout' , component : LogoutComponent},
  {path : 'profile/:username' , component : ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
