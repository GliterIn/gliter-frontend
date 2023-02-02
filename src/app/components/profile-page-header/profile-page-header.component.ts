import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page-header',
  templateUrl: './profile-page-header.component.html',
  styleUrls: ['./profile-page-header.component.css']
})
export class ProfilePageHeaderComponent implements OnInit {

  user: UserProfile | null;
  total_posts: number = 0;
  total_followers: number = 0;
  third_person = false;
  is_following=false;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute,
    public sitedata:SitedataService) {
    this.user = null;
    
    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        this.sitedata.posts_on_screen.subscribe(
          (posts) => {
            this.total_posts = posts.length;
          }
        )
        this.sitedata.followers_on_screen.subscribe(
          (followers) => {
            this.total_followers = followers.length;
          }
        )
        this.auth.get_current_user().subscribe(
          (logged_in_user) => {
            this.sitedata.followers_on_screen.subscribe(
              (followers) => {
                for(let follower of followers){
                  if(follower.username == logged_in_user?.username){
                    this.is_following = true;
                  }
                }
              }
            )
            if (logged_in_user == null || logged_in_user.username != current_username) {
              this.third_person = true;
              this.sitedata.user_on_screen.subscribe(
                (current_user) => {
                  this.user = current_user;
                }
              )
            } else {
              this.user = logged_in_user;
              this.third_person = false;
            }
          }
        )
      }
    )
  }
  ngOnInit(): void {

  }

  toggle_follow(){
    if(this.user != null){
      this.database.follow_user(this.user.username);
      this.is_following = !this.is_following;
    }
  }

}
