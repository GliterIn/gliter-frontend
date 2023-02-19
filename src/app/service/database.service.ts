import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post.model';
import { UserProfile } from '../models/UserProfile.model';
import { AuthenticationService } from './authentication.service';
import { SitedataService } from './sitedata.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  //API_BASE_URL = 'http://localhost:8000/api';
  API_BASE_URL = 'https://gliter-backend.herokuapp.com/api';
  posts = new BehaviorSubject<Post[]>([]);
  feed_posts = new BehaviorSubject<Post[]>([]);
  user: UserProfile | null;
  constructor(public http: HttpClient, public auth: AuthenticationService, public sitedata:SitedataService) {
    this.user = null;
    this.auth.logged_in_user.subscribe(
      (user_response) => {
        this.user = user_response;
        if(user_response != null){
          this.get_user_posts(user_response.username).subscribe(
            (user_posts) => {
              this.posts.next(user_posts);
            }
          );
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
        (_) => {
          if(this.user != null){
            this.get_user_posts(this.user.username).subscribe(
              (user_posts) => {
                this.posts.next(user_posts);
              }
            );
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


  get_user_results(query:string){
    return this.http.post<UserProfile[]>(this.API_BASE_URL + "/users/get-user-results", {
      "query":query
    });
  }


  get_user_posts(username:string){
    return this.http.post<Post[]>(this.API_BASE_URL + "/posts/get-posts", {
      "username":username
    });
  }

  get_user_followers(username:string){
    return this.http.post<string>(this.API_BASE_URL + "/users/get-user-followers", {
      "username":username
    });
  }

  get_user_following(username:string){
    return this.http.post<string>(this.API_BASE_URL + "/users/get-user-following", {
      "username":username
    });
  }

  get_user_feed() {
      return this.http.post<string>(this.API_BASE_URL + '/users/get-user-feed', {
        'user': this.user,
        'uid': this.auth.uid_value,
        'user_token': this.auth.user_token_value,
      });
  }
  
  
  follow_user(user_to_follow: string) {
    if (this.user != null) {
      this.http.post<string>(this.API_BASE_URL + '/actions/follow', {
        'user': this.user,
        'uid': this.auth.uid_value,
        'user_token': this.auth.user_token_value,
        'user_to_follow':user_to_follow
      }).subscribe(
        (response) => {
          console.log(response);
          this.get_user_followers(this.user!.username).subscribe(
            (all_followers) => {
              this.sitedata.followers_on_screen.next(JSON.parse(all_followers));
            }
          )
        }
      )
    }
  }  
}
