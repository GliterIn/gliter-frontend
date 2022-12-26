import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../models/User.model';
import { UserPrivacySetting } from '../models/UserPrivacySetting.model';
import { UserProfile } from '../models/UserProfile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  logged_in = new BehaviorSubject<boolean>(true);

  SIDDHARTH_USER_PROFILE = new UserProfile(
    "Siddharth Singh",
    "https://avatars.githubusercontent.com/u/68241942?v=4",
    "https://img5.goodfon.com/original/1366x768/6/89/dresden-drezden-germaniia.jpg",
    "Munich, Germany",
    new Date(),
    "Founder of Glitter",
    new Date(),
    "Male",
    "Single",
    "Yawn !",
    true,
    true,
    [],
    []
  );

  SIDDHARTH_USER_PRIVACY = new UserPrivacySetting(
    true,
    true
  );

  constructor() {
  }
  get_current_user(): User{
    return new User("siddharth", this.SIDDHARTH_USER_PROFILE, this.SIDDHARTH_USER_PRIVACY);
  }
}
