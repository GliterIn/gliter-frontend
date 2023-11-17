import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Post } from 'src/app/models/Post.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page-posts',
  templateUrl: './profile-page-posts.component.html',
  styleUrls: ['./profile-page-posts.component.css']
})
export class ProfilePagePostsComponent implements OnInit {

  user: UserProfile | null = null;
  third_person = false;
  viewing_feed=false;
  posts: Post[] = [];
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute, public sitedata: SitedataService) {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        if (current_url[0].toString() == "profile") {
          this.viewing_feed=false;
          this.initialize_profile_page_posts(current_url);
        } else if (current_url[0].toString() == "feed") {
          this.viewing_feed=true;
          this.initialize_feed_posts(current_url);
        }
      }
    )
  }

  ngOnInit(): void {
  }

  initialize_profile_page_posts(current_url: UrlSegment[]): void {
    var current_username = current_url[1].toString();
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        this.third_person = (request_base_ == null || request_base_.user.username != current_username);

        if (this.third_person) {
          this.sitedata.user_on_screen.subscribe(
            (current_user) => {
              this.sitedata.posts_on_screen.subscribe(
                (response_post) => {
                  this.user = current_user;
                  this.posts = response_post;
                }
              )
            }
          )
        } else {
          if(request_base_){
            this.user = request_base_.user;
            this.sitedata.logged_user_posts.subscribe(
              (logged_user_posts_) => {
                this.posts = logged_user_posts_;
              }
            )
          }
        }
      }
    )
  }
  initialize_feed_posts(current_url: UrlSegment[]): void {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if(request_base_){
          this.user = request_base_.user;
          this.database.get_user_feed().subscribe(
            (posts_) => {
              this.posts = posts_;
            }
          )
        }
      }
    )
  }
}
