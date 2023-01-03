import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/User.model';
import { UserPrivacySetting } from '../models/UserPrivacySetting.model';
import { UserProfile } from '../models/UserProfile.model';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logged_in = new BehaviorSubject<boolean>(false);

  SIDDHARTH_USER_PROFILE = new UserProfile(
    "Siddharth Singh",
    "https://avatars.githubusercontent.com/u/68241942?v=4",
    "https://img5.goodfon.com/original/1366x768/6/89/dresden-drezden-germaniia.jpg",
    "Munich, Germany",
    new Date(),
    "Founder of Glitter",
    new Date(),
    "Male",
    "Single",
    "Yawn !",
    true,
    true,
    [],
    []
  );

  SIDDHARTH_USER_PRIVACY = new UserPrivacySetting(
    true,
    true
  );

  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user != null) {
        this.logged_in.next(true);
      }
    })
  }

  AuthLogin(provider: GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(
        (data) => {
          console.log('You have been successfully logged in!');
          this.logged_in.next(true);
          console.log(data);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }


  get_current_user(): User {
    return new User("siddharth", this.SIDDHARTH_USER_PROFILE, this.SIDDHARTH_USER_PRIVACY);
  }


  login_user() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  logout_user() {
    return this.afAuth.signOut().then(
      (data) => {
        console.log(data);
        this.logged_in.next(false);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
