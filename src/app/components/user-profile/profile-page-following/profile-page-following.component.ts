import { Component, OnInit } from '@angular/core';
import { UserList } from 'src/app/models/API.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page-following',
  templateUrl: './profile-page-following.component.html',
  styleUrls: ['./profile-page-following.component.css'],
})
export class ProfilePageFollowingComponent implements OnInit {
  user: UserProfile | null = null;
  following: UserList = <UserList>{};
  constructor(
    public database: DatabaseService,
    public sitedata: SitedataService
  ) {
    this.sitedata.user_on_screen.subscribe((data) => {
      if (data != null) {
        this.user = data;
        this.sitedata.following_on_screen.subscribe((following_on_screen_) => {
          this.following = following_on_screen_;
        });
      }
    });
  }

  ngOnInit(): void { }
}
