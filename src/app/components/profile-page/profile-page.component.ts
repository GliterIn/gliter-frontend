import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: UserProfile|null;
  constructor(public auth: AuthenticationService) {
    this.user = null;
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
      }
    )
  }
  ngOnInit(): void {
  }

}
