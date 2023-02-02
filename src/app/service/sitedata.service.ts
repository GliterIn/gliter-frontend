import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Post } from '../models/Post.model';
import { UserProfile } from '../models/UserProfile.model';

@Injectable({
  providedIn: 'root'
})
export class SitedataService {
  user_on_screen = new BehaviorSubject<UserProfile | null>(null);
  followers_on_screen = new BehaviorSubject<UserProfile[]>([]);
  following_on_screen = new BehaviorSubject<UserProfile[]>([]);
  posts_on_screen = new BehaviorSubject<Post[]>([]);
  constructor() {
    
  }
}
