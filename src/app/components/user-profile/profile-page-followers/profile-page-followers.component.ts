import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page-followers',
  templateUrl: './profile-page-followers.component.html',
  styleUrls: ['./profile-page-followers.component.css'],
})
export class ProfilePageFollowersComponent implements OnInit {
  user: UserProfile | null;
  followers: UserProfile[];
  is_hidden = false;
  constructor(
    public database: DatabaseService,
    public sitedata: SitedataService
  ) {
    this.user = null;
    this.followers = [];
    this.sitedata.user_on_screen.subscribe((data) => {
      if (data != null) {
        this.user = data;
        this.sitedata.is_follower_hidden.subscribe((hidden) => {
          this.is_hidden = hidden;
          this.sitedata.followers_on_screen.subscribe((all_followers) => {
            this.followers = all_followers;
          });
        });
      }
    });
  }

  ngOnInit(): void {}
}
