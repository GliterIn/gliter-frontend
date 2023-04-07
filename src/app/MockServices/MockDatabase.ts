import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Post } from "../models/Post.model";
import { UserProfile } from "../models/UserProfile.model";
import { of } from "rxjs";

export class MockDatabaseService{
    posts = new BehaviorSubject<Post[]>([]);
    get_posts(){
      
    }
    get_user_results(query:string){
      if(query != 'test') return of([]);
      const userProfile = new UserProfile(
        '1234567890',
        'john_doe',
        'john.doe@example.com',
        'John Doe',
        'https://example.com/profile_picture.jpg',
        'https://example.com/cover_picture.jpg',
        'San Francisco, CA',
        new Date('1990-01-01'),
        'Software Engineer',
        new Date(),
        'Male',
        'Single',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        true,
        false,
        true
      );
      return of([userProfile]);
    }
  }
  
  