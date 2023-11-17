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

  user_on_screen: UserProfile|null = null;
  logged_in_user: UserProfile|null = null;
  is_editing=false;
  constructor(public sitedata:SitedataService, public auth:AuthenticationService) {
  }

  ngOnInit(): void {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if(request_base_)
          this.logged_in_user = request_base_.user;
      }
    )
    this.sitedata.user_on_screen.subscribe(
      (user_on_screen_) => {
        this.user_on_screen = user_on_screen_;
      }
    )
  }

}
