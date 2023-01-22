import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-profile-page-about',
  templateUrl: './profile-page-about.component.html',
  styleUrls: ['./profile-page-about.component.css']
})
export class ProfilePageAboutComponent implements OnInit {

  user: UserProfile|null;
  constructor(public auth:AuthenticationService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.auth.get_current_user().subscribe(
      (current_user) => {
        this.user = current_user;
      }
    )
  }

}
