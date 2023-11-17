import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserProfile } from '../models/UserProfile.model';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from 'firebase/auth';
import { RequestBase } from '../models/API.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //API_BASE_URL = 'http://localhost:8000/api';
  API_BASE_URL = 'https://gliter-backend.siddharth27.repl.co/api';


  private request_base = new BehaviorSubject<RequestBase | null>(null);
  request_base_value: RequestBase | null = null;
  constructor(public http: HttpClient, public afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((oauth_login_data) => {
      if (oauth_login_data != null) {
        console.log('State Changed : You have been successfully logged in!');
        oauth_login_data?.getIdToken(true).then(
          (user_token_response) => {
            this.http.post<UserProfile>(this.API_BASE_URL + '/login', {
              'uid': oauth_login_data?.uid,
              'email': oauth_login_data?.email
            }).subscribe(
              (backend_login_data) => {
                if (backend_login_data!=null && oauth_login_data != null) {
                  var request_base_ = <RequestBase>{};
                  request_base_.uid = oauth_login_data.uid;
                  request_base_.user_token = user_token_response;
                  request_base_.user = backend_login_data;
                  this.request_base.next(request_base_);
                  this.request_base_value = request_base_;
                }
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
                  if (backend_login_data != null && oauth_login_data != null && oauth_login_data.user != null) {
                    console.log(backend_login_data);
                    var request_base_ = <RequestBase>{};
                    request_base_.uid = oauth_login_data.user.uid;
                    request_base_.user_token = user_token_response;
                    request_base_.user = backend_login_data;
                    this.request_base.next(request_base_);
                    this.request_base_value = request_base_;
                  }
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
      request_base: user
    }).subscribe(
      (user_) => {
        this.request_base_value!.user = user_;
        this.request_base.next(this.request_base_value);
        window.location.href = '/feed';
      },
      (error) => {
        alert(error.error);
      }
    )
  }

  update_user(user: UserProfile) {
    this.http.post<UserProfile>(this.API_BASE_URL + '/update-user', {
      request_base: user
    }).subscribe(
      (user_) => {
        this.request_base_value!.user = user_;
        this.request_base.next(this.request_base_value);
        alert('Your changes were saved.')
      }
    )
  }

  get_request_base(): BehaviorSubject<RequestBase | null> {
    return this.request_base;
  }

  login_user() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  logout_user() {
    this.afAuth.signOut().then(
      (data) => {
        console.log("You have been logged out !");
        this.request_base.next(null);
        this.request_base_value = null;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
