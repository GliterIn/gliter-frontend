import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Post } from "../models/Post.model";

export class MockDatabaseService{
    posts = new BehaviorSubject<Post[]>([]);
    get_posts(){
      
    }
  }
  
  