import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Post } from '../models/Post.model';
import { Comment } from '../models/Comment.model';
import { UserProfile } from '../models/UserProfile.model';
import { AuthenticationService } from './authentication.service';
import { SitedataService } from './sitedata.service';
import { UserSettings } from '../models/Settings.model';
import { RequestBase, UserList } from '../models/API.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  //API_BASE_URL = 'http://localhost:8000/api';
  API_BASE_URL = 'https://gliter-backend.siddharth27.repl.co/api';

  posts = new BehaviorSubject<Post[]>([]);
  feed_posts = new BehaviorSubject<Post[]>([]);

  request_base: RequestBase | null = null;

  constructor(
    public http: HttpClient,
    public auth: AuthenticationService,
    public sitedata: SitedataService
  ) {
    this.auth.get_request_base().subscribe((request_base_) => {
      this.request_base = request_base_;
      if (request_base_) {
        this.get_user_following(request_base_.user.username).subscribe(
          (following_) => {
            this.sitedata.logged_user_following.next(following_.users);
          });

        this.get_user_followers(request_base_.user.username).subscribe(
          (followers_) => {
            this.sitedata.logged_user_followers.next(followers_.users);
          });

        this.get_user_posts(request_base_.user.username).subscribe(
          (posts_) => {
            this.sitedata.logged_user_posts.next(posts_);
          }
        )
      }
    });
  }

  create_reaction(post_id: number, reaction_type: string) {
    if (this.request_base == null) return;
    this.http.post<string>(this.API_BASE_URL + '/posts/create-reaction', {
      request_base: this.request_base,
      post_id: post_id, reaction_type: reaction_type
    })
      .subscribe((response) => {
        console.log(response);
      });
  }

  create_post(post_content: string) {
    if (this.request_base == null) return;

    this.http
      .post<string>(this.API_BASE_URL + '/posts/create-post', {
        request_base: this.request_base,
        post: post_content,
      })
      .subscribe((_) => {
        this.get_user_posts(this.request_base!.user.username).subscribe((user_posts) => {
          this.sitedata.logged_user_posts.next(user_posts);
        });
      });
  }


  get_user_details(username: string) {
    return this.http.post<UserProfile>(
      this.API_BASE_URL + '/users/get-user-details',
      {
        request_base: this.request_base,
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
      request_base: this.request_base,
      username: username,
    });
  }

  get_comments(id: number) {
    return this.http.post<Comment[]>(this.API_BASE_URL + '/posts/get-comments', {
      request_base: this.request_base,
      post_id: id,
    });
  }

  delete_comment(post_id: number,comment_id:number) {
    return this.http.post<string>(this.API_BASE_URL + '/posts/delete-comment', {
      request_base: this.request_base,
      post_id: post_id,
      comment_id: comment_id
    });
  }

  get_user_followers(username: string) {
    return this.http.post<UserList>(
      this.API_BASE_URL + '/users/get-user-followers',
      {
        request_base: this.request_base,
        username: username,
      }
    );
  }

  get_user_follow_requests() {
    return this.http.post<UserList>(
      this.API_BASE_URL + '/users/get-user-follow-request',
      {
        request_base: this.request_base,
      }
    );
  }

  get_user_following(username: string) {
    return this.http.post<UserList>(
      this.API_BASE_URL + '/users/get-user-following',
      {
        request_base: this.request_base,
        username: username
      }
    );
  }

  get_user_followers_count(username: string) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/get-user-followers-count',
      {
        request_base: this.request_base,
        username: username,
      }
    );
  }

  get_user_following_count(username: string) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/get-user-following-count',
      {
        request_base: this.request_base,
        username: username,
      }
    );
  }

  get_user_feed() {
    return this.http.post<Post[]>(this.API_BASE_URL + '/users/get-user-feed', {
      request_base: this.request_base,
    });
  }

  follow_user(user_to_follow: string) {
    if (this.request_base == null) return;
    this.http
      .post<string>(this.API_BASE_URL + '/actions/follow', {
        request_base: this.request_base,
        user_to_follow: user_to_follow,
      })
      .subscribe((response) => {
        this.get_user_followers(
          this.request_base!.user.username
        ).subscribe((all_followers) => {
          this.sitedata.followers_on_screen.next(all_followers);
        });
      });
  }



  get_user_settings() {
    return this.http.post<UserSettings>(
      this.API_BASE_URL + '/users/get-user-settings',
      {
        request_base: this.request_base
      }
    );
  }

  set_user_settings(user_settings: UserSettings) {
    return this.http.post<string>(
      this.API_BASE_URL + '/users/set-user-settings',
      {
        request_base: this.request_base,
        setting: user_settings,
      }
    );
  }


  verify_user(user_to_verify: string) {
    if (this.request_base == null) return;
    this.http
      .post<string>(this.API_BASE_URL + '/actions/verify', {
        request_base: this.request_base,
        user_to_verify: user_to_verify,
      })
      .subscribe((response) => {
        alert(response);
        window.location.reload();
      });
  }

  get_follow_status(user_to_follow: string) {
    return this.http
      .post<{ status: string }>(this.API_BASE_URL + '/actions/check_follow_status', {
        request_base: this.request_base,
        user_to_follow: user_to_follow,
      });
  }

  send_follow_request(user_to_follow: string) {
    return this.http
      .post<string>(this.API_BASE_URL + '/actions/request_follow', {
        request_base: this.request_base,
        user_to_follow: user_to_follow,
      });
  }


  approve_follow(user_to_approve: string) {
    return this.http
      .post<string>(this.API_BASE_URL + '/actions/approve_follow', {
        request_base: this.request_base,
        user_to_approve: user_to_approve,
      });
  }

  create_comment(post_id:number, comment_content: string) {
    return this.http
      .post<string>(this.API_BASE_URL + '/posts/create-comment', {
        request_base: this.request_base,
        comment_content: comment_content,
        post_id : post_id
      });
  }
}
