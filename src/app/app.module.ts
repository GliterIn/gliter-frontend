import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { PeopleYouMayKnowComponent } from './components/people-you-may-know/people-you-may-know.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { SharePostComponent } from './components/share-post/share-post.component';
import { MyProfileSidebarComponent } from './components/my-profile-sidebar/my-profile-sidebar.component';
import { ProfilePageHeaderComponent } from './components/profile-page-header/profile-page-header.component';
import { ProfilePageDetailsComponent } from './components/profile-page-details/profile-page-details.component';
import { BeRightBackComponent } from './components/be-right-back/be-right-back.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfilePageAboutComponent } from './components/profile-page-about/profile-page-about.component';
import { InvestorsComponent } from './components/investors/investors.component';
import { AboutComponent } from './components/about/about.component';
import { ProfilePageContentComponent } from './components/profile-page-content/profile-page-content.component';
import { ProfilePagePostsComponent } from './components/profile-page-posts/profile-page-posts.component';
import { ProfilePageGalleryComponent } from './components/profile-page-gallery/profile-page-gallery.component';
import { ProfilePageBadgesComponent } from './components/profile-page-badges/profile-page-badges.component';
import { ProfilePageFollowersComponent } from './components/profile-page-followers/profile-page-followers.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfilePageFollowingComponent } from './components/profile-page-following/profile-page-following.component';


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
    OnboardingComponent,
    EditProfileComponent,
    ProfilePageAboutComponent,
    InvestorsComponent,
    AboutComponent,
    ProfilePageContentComponent,
    ProfilePagePostsComponent,
    ProfilePageGalleryComponent,
    ProfilePageBadgesComponent,
    ProfilePageFollowersComponent,
    FooterComponent,
    ProfilePageFollowingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
