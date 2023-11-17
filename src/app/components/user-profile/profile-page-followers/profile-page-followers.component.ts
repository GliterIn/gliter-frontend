import { Component, OnInit } from '@angular/core';
import { UserList } from 'src/app/models/API.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page-followers',
  templateUrl: './profile-page-followers.component.html',
  styleUrls: ['./profile-page-followers.component.css'],
})
export class ProfilePageFollowersComponent implements OnInit {
  user: UserProfile | null = null;
  followers: UserList = <UserList>{};

  constructor(
    public database: DatabaseService,
    public sitedata: SitedataService
  ) {
    this.sitedata.user_on_screen.subscribe((data) => {
      if (data != null) {
        this.user = data;
        this.sitedata.followers_on_screen.subscribe((followers_on_screen_) => {
            this.followers = followers_on_screen_;
            console.log(this.followers)
        });
      }
    });
  }

  ngOnInit(): void {}
}
