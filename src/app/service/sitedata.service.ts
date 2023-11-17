import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Post } from '../models/Post.model';
import { UserProfile } from '../models/UserProfile.model';
import { UserList } from '../models/API.model';

@Injectable({
  providedIn: 'root'
})
export class SitedataService {
  
  user_on_screen = new BehaviorSubject<UserProfile | null>(null);
  followers_on_screen = new BehaviorSubject<UserList>(<UserList>{hidden:false, users: []});
  following_on_screen = new BehaviorSubject<UserList>(<UserList>{hidden:false, users: []});
  followers_count_on_screen = new BehaviorSubject<number>(0);
  following_count_on_screen = new BehaviorSubject<number>(0);
  posts_on_screen = new BehaviorSubject<Post[]>([]);

  logged_user_posts = new BehaviorSubject<Post[]>([]);
  logged_user_following = new BehaviorSubject<UserProfile[]>([]);
  logged_user_followers = new BehaviorSubject<UserProfile[]>([]);
  constructor() {
  }
  update_user(user: UserProfile) {
    this.user_on_screen.next(user);
  }
}
