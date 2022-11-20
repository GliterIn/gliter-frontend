import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post.model';
import { Reaction, ReactionTypes } from '../models/Reaction.model';
import { User } from '../models/User.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  API_ROOT = 'https://s-i-d-d-i-s-ubiquitous-couscous-j97wgj7j76ghpqjv-8080.preview.app.github.dev';


  posts = new BehaviorSubject<Post[]>([]);
  constructor(public http:HttpClient, public auth: AuthenticationService) {
    this.get_posts(this.auth.get_current_user().username);
  }
  get_posts(username: string){
    this.http.get<Post[]>(this.API_ROOT + "/get-posts").subscribe(
      (data)=>{
        console.log(data);
        //this.posts.next(data);
      }
    );
  }
}
