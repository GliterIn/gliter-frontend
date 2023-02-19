import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page-about',
  templateUrl: './profile-page-about.component.html',
  styleUrls: ['./profile-page-about.component.css']
})
export class ProfilePageAboutComponent implements OnInit {

  user: UserProfile|null;
  logged_in_user: UserProfile|null;
  is_editing=false;
  constructor(public sitedata:SitedataService, public auth:AuthenticationService) {
    this.user = null;
    this.logged_in_user=null;
  }

  ngOnInit(): void {
    this.auth.get_current_user().subscribe(
      (logged_in_user) => {
        this.logged_in_user = logged_in_user;
      }
    )
    this.sitedata.user_on_screen.subscribe(
      (current_user) => {
        this.user = current_user;
      }
    )
  }

}
