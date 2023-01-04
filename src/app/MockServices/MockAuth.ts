import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { UserProfile } from "../models/UserProfile.model";

export class MockAuthenticationService {
  logged_in = new BehaviorSubject<boolean>(false);
  logged_in_user = new BehaviorSubject<UserProfile | null>(null);

  get_current_user(): BehaviorSubject<UserProfile | null> {
    return this.logged_in_user;
  }

  login_user() {

  }
  logout_user() {

  }
}
