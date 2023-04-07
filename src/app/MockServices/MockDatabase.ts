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
      const userProfile: UserProfile = {
        uid: '1234567890',
        username: 'john_doe',
        email: 'john.doe@example.com',
        name: 'John Doe',
        profile_picture: 'https://example.com/profile_picture.jpg',
        cover_picture: 'https://example.com/cover_picture.jpg',
        location: 'San Francisco, CA',
        birthday: new Date('1990-01-01'),
        occupation: 'Software Engineer',
        joined_on: new Date(),
        gender: 'Male',
        relationship: 'Single',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        is_verified: true,
        is_admin: false,
        is_onboarded: true
      };
      
      return of([userProfile]);
    }

    create_post(post_content:string){
      return true;
    }
  }
  
  