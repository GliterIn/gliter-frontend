import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Post } from '../models/Post.model';
import { UserProfile } from '../models/UserProfile.model';
import { AuthenticationService } from './authentication.service';
import { SitedataService } from './sitedata.service';
import { UserSettings } from '../models/Settings.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  //API_BASE_URL = 'http://localhost:8000/api';
  API_BASE_URL = 'https://gliter-backend.siddharth27.repl.co/api';
  posts = new BehaviorSubject<Post[]>([]);
  feed_posts = new BehaviorSubject<Post[]>([]);
  user: UserProfile | null;
  constructor(
    public http: HttpClient,
    public auth: AuthenticationService,
    public sitedata: SitedataService
  ) {
    this.user = null;
    this.auth.logged_in_user.subscribe((user_response) => {
      this.user = user_response;
      if (user_response != null) {
        this.get_user_posts(user_response.username).subscribe((user_posts) => {
          this.posts.next(user_posts);
        });
      }
    });
  }

  create_post(post_content: string) {
    if (this.user != null) {
      this.http
        .post<string>(this.API_BASE_URL + '/posts/create-post', {
          user: this.user,
          uid: this.auth.uid_value,
          user_token: this.auth.user_token_value,
          post: post_content,
        })
        .subscribe((_) => {
          if (this.user != null) {
            this.get_user_posts(this.user.username).subscribe((user_posts) => {
              this.posts.next(user_posts);
              this.sitedata.posts_on_screen.next(user_posts);
            });
          }
        });
    }
  }

  get_user_details(username: string) {
    return this.http.post<UserProfile>(
      this.API_BASE_URL + '/users/get-user-details',
      {
        user: this.user,
        uid: this.auth.uid_value,
        user_token: this.auth.user_token_value,
        username: username,
      }
    );
  }

  get_user_results(query: string) {
    return this.http.post<UserProfile[]>(
      this.API_BASE_URL + '/users/get-user-results',
      {
        query: query,
      }
    );
  }

  get_user_posts(username: string) {
    return this.http.post<Post[]>(this.API_BASE_URL + '/posts/get-posts', {
      username: username,
    });
  }

  get_user_followers(username: string, uid: string, user_token: string) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/get-user-followers',
      {
        username: username,
        uid: uid,
        user_token: user_token,
      }
    );
  }

  get_user_following(username: string, uid: string, user_token: string) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/get-user-following',
      {
        username: username,
        uid: uid,
        user_token: user_token,
      }
    );
  }

  get_user_followers_count(username: string) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/get-user-followers-count',
      {
        username: username,
      }
    );
  }

  get_user_following_count(username: string) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/get-user-following-count',
      {
        username: username,
      }
    );
  }

  get_user_feed() {
    return this.http.post<string>(this.API_BASE_URL + '/users/get-user-feed', {
      user: this.user,
      uid: this.auth.uid_value,
      user_token: this.auth.user_token_value,
    });
  }

  follow_user(user_to_follow: string) {
    if (this.user != null) {
      this.http
        .post<string>(this.API_BASE_URL + '/actions/follow', {
          user: this.user,
          uid: this.auth.uid_value,
          user_token: this.auth.user_token_value,
          user_to_follow: user_to_follow,
        })
        .subscribe((response) => {
          this.auth.user_token.subscribe((token) => {
            this.get_user_followers(
              this.user!.username,
              this.user!.uid,
              token
            ).subscribe((all_followers) => {
              if (all_followers == "Hidden") {
                this.sitedata.is_follower_hidden.next(true);
                this.sitedata.followers_on_screen.next([]);
              } else {
                this.sitedata.followers_on_screen.next(JSON.parse(all_followers));
                this.sitedata.is_follower_hidden.next(false);
                this.sitedata.followers_count_on_screen.next(JSON.parse(all_followers).length)
              }
            });
          });
        });
    }
  }


  get_user_settings() {
    return this.http.post<any>(
      this.API_BASE_URL + '/users/get-user-settings',
      {
        user: this.user,
        uid: this.auth.uid_value,
        user_token: this.auth.user_token_value,
      }
    ).pipe(
      map( (data_:string )=>{
        var data = JSON.parse(data_);
        var user_settings = <UserSettings>{};
        user_settings.username = data['username'];
        user_settings.follower_visible = data['follower_visible'];
        user_settings.following_visible = data['following_visible'];
        user_settings.private_account = data['private_account'];
        return user_settings;
      })
    );
  }

  set_user_settings(user_settings: UserSettings) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/set-user-settings',
      {
        user: this.user,
        uid: this.auth.uid_value,
        user_token: this.auth.user_token_value,
        setting: user_settings,
      }
    );
  }


  verify_user(user_to_verify: string) {
    if (this.user != null) {
      this.http
        .post<string>(this.API_BASE_URL + '/actions/verify', {
          user: this.user,
          uid: this.auth.uid_value,
          user_token: this.auth.user_token_value,
          user_to_verify: user_to_verify,
        })
        .subscribe((response) => {
          alert(response);
          window.location.reload();
        });
    }
  }
}
