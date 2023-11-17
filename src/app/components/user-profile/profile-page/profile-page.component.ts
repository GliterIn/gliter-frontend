import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  third_person = false;
  user_on_screen_username: string = '';
  tab_name = '';
  profile_loaded = false;
  private_account = false;

  constructor(
    public database: DatabaseService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sitedata: SitedataService,
    public title: Title,
    public auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        this.user_on_screen_username = current_url[1].toString();
        console.log(this.user_on_screen_username);
        // Get Tab Name
        if (current_url.length >= 3) {
          var current_tab = current_url[2].toString();
          this.tab_name = current_tab;
        }

        // Check if we need to refetch data
        console.log(this.sitedata.user_on_screen_static);
        console.log(this.user_on_screen_username)

        if (this.sitedata.user_on_screen_static && this.user_on_screen_username == this.sitedata.user_on_screen_static.username) {
          // User in sitedata cache is same as user on screen. 
          console.log("User in sitedata cache is same as user on screen. ");
          this.private_account = this.sitedata.user_on_screen_static.private_account;
          this.profile_loaded = true;
        } else {
          // User in sitedata cache is different from user on screen.
          console.log("User in sitedata cache is different from user on screen.");
          this.profile_loaded = false;
          this.auth.get_request_base().subscribe(
            (_) => {
              this.reload_new_data(this.user_on_screen_username);
            }
          )
        }
      },
      (error) => {
        console.log(error.error);
        this.router.navigate(['feed']);
      }
    );
  }

  setMetaTags(user: UserProfile): void {
    if (this.tab_name == '') {
      this.title.setTitle(user.name + ' | Gliter');
    } else if (this.tab_name == 'about') {
      this.title.setTitle(user.name + "'s About");
    } else if (this.tab_name == 'followers') {
      this.title.setTitle(user.name + "'s Followers");
    } else if (this.tab_name == 'following') {
      this.title.setTitle(user.name + "'s Following");
    }
  }

  reload_new_data(username: string) {
    // Get User Details
    this.database.get_user_details(username).subscribe((user_details_) => {
      // Get User Following
      this.database.get_user_following(username).subscribe(
        (following_) => {
          // Get User Followers
          this.database.get_user_followers(username).subscribe(
            (followers_) => {
              // Get User Posts
              this.database.get_user_posts(username).subscribe(
                (posts_) => {
                  // Get Follower Count
                  this.database.get_user_followers_count(username).subscribe(
                    (followers_count_) => {
                      // Get Following Count
                      this.database.get_user_following_count(username).subscribe(
                        (following_count_) => {


                          this.sitedata.followers_on_screen.next(followers_);
                          this.sitedata.following_on_screen.next(following_);

                          this.sitedata.followers_count_on_screen.next(+followers_count_);
                          this.sitedata.following_count_on_screen.next(+following_count_);

                          this.sitedata.posts_on_screen.next(posts_);

                          this.setMetaTags(user_details_);
                          this.sitedata.update_user(user_details_);
                          this.private_account = user_details_.private_account;
                          this.profile_loaded = true;
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      );
    }
    )
  }

}
