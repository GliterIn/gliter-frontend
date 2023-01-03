import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeRightBackComponent } from './components/be-right-back/be-right-back.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {path : 'feed' , title:'Feed', component : FeedComponent},
  {path : 'login' , title:'Login', component : LoginComponent},
  {path : 'logout' , title:'Logged Out', component : LogoutComponent},
  {path : 'brb' , title:'Coming Soon !', component : BeRightBackComponent},
  {path : 'profile/:username' , component : ProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
