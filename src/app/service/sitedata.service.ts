import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Post } from '../models/Post.model';
import { UserProfile } from '../models/UserProfile.model';

@Injectable({
  providedIn: 'root'
})
export class SitedataService {
  user_on_screen_username='';
  user_on_screen = new BehaviorSubject<UserProfile | null>(null);
  followers_on_screen = new BehaviorSubject<UserProfile[]>([]);
  following_on_screen = new BehaviorSubject<UserProfile[]>([]);
  posts_on_screen = new BehaviorSubject<Post[]>([]);
  constructor() {
    
  }
  update_user(user:UserProfile){
    this.user_on_screen.next(user);
    this.user_on_screen_username = user.username;
  }
}
