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

  user: UserProfile | null = null;
  total_posts = 0;
  total_followers = 0;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if(request_base_){
          this.user = request_base_.user;
          
          this.database.get_user_posts(request_base_.user.username).subscribe(
            (posts_) => {
              this.total_posts = posts_.length;
            }
          )

          this.database.get_user_followers_count(request_base_.user.username).subscribe(
            (total_followers_) => {
              this.total_followers = +total_followers_;
            }
          )
        }
        
      }
    )
  }

  ngOnInit(): void {
  }

}
