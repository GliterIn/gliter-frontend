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
  API_BASE_URL = 'https://gliter-backend.herokuapp.com/api/posts';
  posts = new BehaviorSubject<Post[]>([]);
  user: UserProfile | null;
  constructor(public http: HttpClient, public auth: AuthenticationService) {
    this.user = null;
    this.auth.logged_in_user.subscribe(
      (user_response) => {
        this.user = user_response;
        this.get_posts();
      }
    )
  }


  get_posts(){
    if(this.user != null){
      this.http.post<Post[]>(this.API_BASE_URL + '/get-posts',{
        'user': this.user,
        'uid': this.auth.uid_value,
        'user_token': this.auth.user_token_value,       
      }).subscribe(
        (response) => {
          console.log(response);
          this.posts.next(response);
        }
      )
    }
  }
  create_post(post_content : string) {
    if (this.user != null) {
      this.http.post<string>(this.API_BASE_URL + '/create-post', {
        'user': this.user,
        'uid': this.auth.uid_value,
        'user_token': this.auth.user_token_value,
        'post': post_content
      }).subscribe(
        (response) => {
          console.log(response);
        }
      )
    }
  }
}
