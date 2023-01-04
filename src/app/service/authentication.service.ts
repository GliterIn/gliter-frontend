import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserProfile } from '../models/UserProfile.model';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logged_in = new BehaviorSubject<boolean>(false);
  API_BASE_URL = 'https://gliter-backend.herokuapp.com/api';

  logged_in_user = new BehaviorSubject<UserProfile|null>(null);

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
        (oauth_login_data) => {
          console.log('You have been successfully logged in!');
          this.http.post<UserProfile>(this.API_BASE_URL + '/login',{
            'uid': oauth_login_data.user?.uid
          }).subscribe(
            (backend_login_data) => {
              this.logged_in.next(true);
              this.logged_in_user.next(backend_login_data);
            }
          )
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  onboard_user(user:UserProfile){
    this.http.post<UserProfile>(this.API_BASE_URL + '/onboarding',user).subscribe(
      (backend_login_data) => {
        this.logged_in_user.next(backend_login_data);
      }
    )
  }

  get_current_user(): BehaviorSubject<UserProfile|null> {
    return this.logged_in_user;
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
