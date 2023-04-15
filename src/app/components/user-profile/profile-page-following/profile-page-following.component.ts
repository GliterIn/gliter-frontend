import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page-following',
  templateUrl: './profile-page-following.component.html',
  styleUrls: ['./profile-page-following.component.css'],
})
export class ProfilePageFollowingComponent implements OnInit {
  user: UserProfile | null;
  following: UserProfile[];
  is_hidden = false;
  constructor(
    public database: DatabaseService,
    public sitedata: SitedataService
  ) {
    this.user = null;
    this.following = [];
    this.sitedata.user_on_screen.subscribe((data) => {
      if (data != null) {
        this.user = data;
        this.sitedata.is_following_hidden.subscribe((hidden) => {
          this.is_hidden = hidden;
          this.sitedata.following_on_screen.subscribe((all_followers) => {
            this.following = all_followers;
          });
        });
      }
    });
  }

  ngOnInit(): void {}
}
