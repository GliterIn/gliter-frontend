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

  user: UserProfile | null;
  third_person = false;
  posts: Post[] = [];
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute, public sitedata: SitedataService) {
    this.user = null;
    this.activatedRoute.url.subscribe(
      (current_url) => {
        if (current_url[0].toString() == "profile") {
          this.initialize_profile_page_posts(current_url);
        }else if(current_url[0].toString() == "feed"){
          this.initialize_feed_posts(current_url);
        }
      }
    )
  }

  ngOnInit(): void {
  }

  initialize_profile_page_posts(current_url: UrlSegment[]): void {
    var current_username = current_url[1].toString();
    this.auth.get_current_user().subscribe(
      (logged_in_user) => {
        this.third_person = logged_in_user == null || logged_in_user.username != current_username;
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
          this.user = logged_in_user;
          this.sitedata.posts_on_screen.subscribe(
            (response_post) => {
              this.posts = response_post;
            }
          )
        }
      }
    )
  }
  initialize_feed_posts(current_url: UrlSegment[]): void {
    this.auth.get_current_user().subscribe(
      (logged_in_user) => {
        this.user = logged_in_user;
          this.database.posts.subscribe(
            (response_post) => {
              this.posts = response_post;
            }
          )
      }
    )
  }
}
