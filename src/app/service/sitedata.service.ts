import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserProfile } from '../models/UserProfile.model';

@Injectable({
  providedIn: 'root'
})
export class SitedataService {
  user_on_screen = new BehaviorSubject<UserProfile | null>(null);
  constructor() {
    
  }
}
