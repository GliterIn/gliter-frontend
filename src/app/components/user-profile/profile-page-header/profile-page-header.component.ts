import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserList } from 'src/app/models/API.model';
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

  user_on_screen: UserProfile | null = null;

  total_posts: number = 0;
  followers_count = 0;

  third_person = false;
  is_following = false;
  follows_you = false;
  is_admin = false;
  follow_status = '';
  @Input('private_account') private_account = false;

  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute,
    public sitedata: SitedataService) {

    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        this.sitedata.posts_on_screen.subscribe(
          (posts) => {
            this.total_posts = posts.length;
          }
        )

        this.sitedata.followers_count_on_screen.subscribe(
          (followers_count_) => {
            this.followers_count = followers_count_;
          }
        )
        this.auth.get_request_base().subscribe(
          (request_base_) => {
            if (request_base_) {
              this.is_admin = request_base_.user.is_admin;
              if (request_base_.user.username != current_username) {
                this.database.get_follow_status(current_username).subscribe(
                  (follow_status_) => {
                    this.follow_status = follow_status_['status'];
                  }
                )
              }
            }

            this.sitedata.logged_user_following.subscribe(
              (logged_user_following_) => {
                for (let follower of logged_user_following_) {
                  if (follower.username == current_username) {
                    this.is_following = true;
                  }
                }
              }
            )

            this.sitedata.logged_user_followers.subscribe(
              (logged_user_followers_) => {
                for (let follower of logged_user_followers_) {
                  if (follower.username == current_username) {
                    this.follows_you = true;
                  }
                }
              }
            )
            if (request_base_ == null || request_base_.user.username != current_username) {
              this.third_person = true;
              this.sitedata.user_on_screen.subscribe(
                (current_user) => {
                  this.user_on_screen = current_user;
                }
              )
            } else {
              this.user_on_screen = request_base_.user;
              this.third_person = false;
            }
          }
        )
      }
    )
  }
  ngOnInit(): void {

  }

  toggle_follow() {
    if (this.user_on_screen != null) {
      this.database.follow_user(this.user_on_screen.username);
      this.is_following = !this.is_following;
    }
  }

  send_follow_request() {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if (request_base_ && this.user_on_screen) {
          this.database.send_follow_request(this.user_on_screen.username).subscribe(
            (_) => {
              alert("Request Sent.");

              // Update the Status
              if (this.user_on_screen) {
                this.database.get_follow_status(this.user_on_screen.username).subscribe(
                  (follow_status_) => {
                    this.follow_status = follow_status_['status'];
                  }
                )
              }
            }
          );
        }
      }
    )
  }
  verify_user() {
    if (this.user_on_screen != null) {
      this.database.verify_user(this.user_on_screen.username);
    }
  }

}
