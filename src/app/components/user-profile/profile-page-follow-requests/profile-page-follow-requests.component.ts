import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page-follow-requests',
  templateUrl: './profile-page-follow-requests.component.html',
  styleUrls: ['./profile-page-follow-requests.component.css']
})
export class ProfilePageFollowRequestsComponent implements OnInit {
  user: UserProfile | null = null;
  followers: UserProfile[] = [];

  constructor(
    public database: DatabaseService,
    public sitedata : SitedataService,
  ) {
    this.sitedata.logged_user_follow_requests.subscribe(
      (follow_requests_) => {
        this.followers = follow_requests_;
      }
    )
  }
  ngOnInit(): void {
  }

  approve_user(username:string){
    this.database.approve_follow(username).subscribe(
      (data) => {
        if(data == "OK"){
          this.database.get_user_follow_requests().subscribe(
            (follow_request_) => {
              this.sitedata.logged_user_follow_requests.next(follow_request_.users);
            }
          )
        }
      }
    )
  }
}
