import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  posts = new BehaviorSubject<Post[]>([]);
  constructor(public http: HttpClient, public auth: AuthenticationService) {
    
  }
}
