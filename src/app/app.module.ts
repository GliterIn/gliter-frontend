import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { PeopleYouMayKnowComponent } from './components/people-you-may-know/people-you-may-know.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { SharePostComponent } from './components/share-post/share-post.component';
import { MyProfileSidebarComponent } from './components/my-profile-sidebar/my-profile-sidebar.component';
import { ProfilePageHeaderComponent } from './components/profile-page-header/profile-page-header.component';
import { ProfilePageDetailsComponent } from './components/profile-page-details/profile-page-details.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { BeRightBackComponent } from './components/be-right-back/be-right-back.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfilePageComponent,
    FeedComponent,
    PeopleYouMayKnowComponent,
    UserFeedComponent,
    SharePostComponent,
    MyProfileSidebarComponent,
    ProfilePageHeaderComponent,
    ProfilePageDetailsComponent,
    LoginComponent,
    LogoutComponent,
    BeRightBackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatButtonModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
