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
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ProfilePageComponent } from './components/user-profile/profile-page/profile-page.component';
import { FeedComponent } from './components/common/feed/feed.component';
import { PeopleYouMayKnowComponent } from './components/common/people-you-may-know/people-you-may-know.component';
import { SharePostComponent } from './components/posts/share-post/share-post.component';
import { MyProfileSidebarComponent } from './components/user-profile/my-profile-sidebar/my-profile-sidebar.component';
import { ProfilePageHeaderComponent } from './components/user-profile/profile-page-header/profile-page-header.component';
import { ProfilePageDetailsComponent } from './components/user-profile/profile-page-details/profile-page-details.component';
import { BeRightBackComponent } from './components/be-right-back/be-right-back.component';
import { OnboardingComponent } from './components/authentication/onboarding/onboarding.component';
import { EditProfileComponent } from './components/user-profile/edit-profile/edit-profile.component';
import { ProfilePageAboutComponent } from './components/user-profile/profile-page-about/profile-page-about.component';
import { InvestorsComponent } from './components/customer-facing/investors/investors.component';
import { AboutComponent } from './components/customer-facing/about/about.component';
import { ProfilePageContentComponent } from './components/user-profile/profile-page-content/profile-page-content.component';
import { ProfilePagePostsComponent } from './components/user-profile/profile-page-posts/profile-page-posts.component';
import { ProfilePageGalleryComponent } from './components/user-profile/profile-page-gallery/profile-page-gallery.component';
import { ProfilePageBadgesComponent } from './components/user-profile/profile-page-badges/profile-page-badges.component';
import { ProfilePageFollowersComponent } from './components/user-profile/profile-page-followers/profile-page-followers.component';
import { FooterComponent } from './components/common/footer/footer.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfilePageFollowingComponent } from './components/user-profile/profile-page-following/profile-page-following.component';
import { VerifiedTickComponent } from './components/common/verified-tick/verified-tick.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfilePageComponent,
    FeedComponent,
    PeopleYouMayKnowComponent,
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
    ProfilePageFollowingComponent,
    VerifiedTickComponent
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
