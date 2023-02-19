import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-my-profile-sidebar',
  templateUrl: './my-profile-sidebar.component.html',
  styleUrls: ['./my-profile-sidebar.component.css']
})
export class MyProfileSidebarComponent implements OnInit {

  user: UserProfile | null;
  total_posts = 0;
  total_followers = 0;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.user = null;
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
        this.database.get_user_posts(data!.username).subscribe(
          (posts) => {
            this.total_posts = posts.length;
          }
        ),
        this.database.get_user_followers(data!.username).subscribe(
          (all_followers) => {
            this.total_followers = JSON.parse(all_followers).length;
          }
        )
      }
    )
  }

  ngOnInit(): void {
  }

}