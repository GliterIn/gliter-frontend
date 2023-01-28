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
  constructor(public sitedata:SitedataService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.sitedata.user_on_screen.subscribe(
      (current_user) => {
        this.user = current_user;
      }
    )
  }

}
