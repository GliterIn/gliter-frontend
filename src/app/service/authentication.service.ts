import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserProfile } from '../models/UserProfile.model';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //API_BASE_URL = 'http://localhost:8000/api';
  API_BASE_URL = 'https://gliter-backend.herokuapp.com/api';
  logged_in_user = new BehaviorSubject<UserProfile | null>(null);
  user_token = new BehaviorSubject<string>("");

  user_token_value = "";
  uid_value = "";

  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((oauth_login_data) => {
      if (oauth_login_data != null) {
        console.log('You have been successfully logged in!');
        oauth_login_data?.getIdToken(true).then(
          (user_token_response) => {
            this.http.post<UserProfile>(this.API_BASE_URL + '/login', {
              'uid': oauth_login_data?.uid
            }).subscribe(
              (backend_login_data) => {
                this.user_token_value = user_token_response;
                this.uid_value = oauth_login_data?.uid; 
                this.user_token.next(user_token_response);
                this.logged_in_user.next(backend_login_data);
              }
            )
          }
        )
      }
    })
  }

  AuthLogin(provider: GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(
        (oauth_login_data) => {
          console.log('You have been successfully logged in!');
          oauth_login_data.user?.getIdToken(true).then(
            (user_token_response) => {
              this.http.post<UserProfile>(this.API_BASE_URL + '/login', {
                'uid': oauth_login_data.user?.uid
              }).subscribe(
                (backend_login_data) => {
                  this.user_token.next(user_token_response);
                  this.logged_in_user.next(backend_login_data);
                }
              )
            }
          )
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  update_credentials() {

  }

  onboard_user(user: UserProfile) {
    this.http.post<UserProfile>(this.API_BASE_URL + '/onboarding', {
      'user': user,
      'uid': this.uid_value,
      'user_token': this.user_token_value
    }).subscribe(
      (backend_login_data) => {
        this.logged_in_user.next(backend_login_data);
        window.location.href = '/feed';
      },
      (error) => {
        alert(error.error);
      }
    )
  }

  update_user(user: UserProfile) {
    this.http.post<UserProfile>(this.API_BASE_URL + '/update-user', {
      'user': user,
      'uid': this.uid_value,
      'user_token': this.user_token_value
    }).subscribe(
      (backend_login_data) => {
        this.logged_in_user.next(backend_login_data);
        alert('Your changes were saved.')
      }
    )
  }

  get_current_user(): BehaviorSubject<UserProfile | null> {
    return this.logged_in_user;
  }

  login_user() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  logout_user() {
    this.afAuth.signOut().then(
      (data) => {
        console.log("You have been logged out !");
        this.logged_in_user.next(null);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
