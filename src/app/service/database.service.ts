import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post.model';
import { UserProfile } from '../models/UserProfile.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  API_BASE_URL = 'https://gliter-backend.herokuapp.com/api';
  posts = new BehaviorSubject<Post[]>([]);
  user: UserProfile | null;
  constructor(public http: HttpClient, public auth: AuthenticationService) {
    this.user = null;
    this.auth.logged_in_user.subscribe(
      (user_response) => {
        this.user = user_response;
        if(user_response != null){
          this.get_user_posts(user_response.username);
        }
      }
    )
  }


  create_post(post_content : string) {
    if (this.user != null) {
      this.http.post<string>(this.API_BASE_URL + '/posts/create-post', {
        'user': this.user,
        'uid': this.auth.uid_value,
        'user_token': this.auth.user_token_value,
        'post': post_content
      }).subscribe(
        (response) => {
          console.log(response);
          if(this.user != null){
            this.get_user_posts(this.user.username);
          }
        }
      )
    }
  }

  get_user_details(username:string){
    return this.http.post<UserProfile>(this.API_BASE_URL + "/users/get-user-details", {
      "username":username
    });
  }


  get_user_posts(username:string){
    return this.http.post<Post[]>(this.API_BASE_URL + "/posts/get-posts", {
      "username":username
    });
  }
}
