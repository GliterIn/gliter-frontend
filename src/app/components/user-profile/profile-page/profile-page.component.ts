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
  user: string = '';
  tab_name = '';
  profile_loaded = false;
  constructor(
    public database: DatabaseService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public sitedata: SitedataService,
    public title: Title,
    public auth: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        this.user = current_url[1].toString();
        // console.log("this.user" + this.user);
        // console.log("cache" + this.sitedata.user_on_screen_username);
        if (current_url.length >= 3) {
          var current_tab = current_url[2].toString();
          this.tab_name = current_tab;
        }

        if (this.sitedata.user_on_screen_username != this.user) {
          this.profile_loaded = false;
          
          this.database
            .get_user_details(this.user)
            .subscribe((new_user_profile) => {
              
              this.auth.user_token.subscribe((token) => {
                // if (token) {
                  this.database
                    .get_user_following(
                      new_user_profile.username,
                      this.auth.uid_value,
                      token
                    )
                    .subscribe((all_following) => {
                      console.log("User : " + this.user);
                      this.database
                        .get_user_followers(
                          new_user_profile.username,
                          this.auth.uid_value,
                          token
                        )
                        .subscribe((all_followers) => {
                          this.database
                            .get_user_posts(this.user)
                            .subscribe((all_posts) => {
                              //all_following != 'Hidden'
                              if (true ) {
                                this.sitedata.following_on_screen.next(
                                  all_following
                                );
                                this.sitedata.is_following_hidden.next(false);
                                this.sitedata.following_count_on_screen.next(
                                  all_following.length
                                );
                              } else {
                                this.sitedata.following_on_screen.next([]);
                                this.sitedata.is_following_hidden.next(true);
                                this.database
                                  .get_user_following_count(this.user)
                                  .subscribe((following_count) => {
                                    this.sitedata.following_count_on_screen.next(
                                      +following_count
                                    );
                                  });
                              }
//all_followers != 'Hidden'
                              if (true) {
                                this.sitedata.followers_on_screen.next(
                                  all_followers
                                );
                                this.sitedata.is_follower_hidden.next(false);
                                this.sitedata.followers_count_on_screen.next(
                                  all_followers.length
                                );
                              } else {
                                this.sitedata.followers_on_screen.next([]);
                                this.sitedata.is_follower_hidden.next(true);
                                this.database
                                  .get_user_followers_count(this.user)
                                  .subscribe((followers_count) => {
                                    this.sitedata.followers_count_on_screen.next(
                                      +followers_count
                                    );
                                  });
                              }

                              this.sitedata.posts_on_screen.next(all_posts);
                              this.setMetaTags(new_user_profile);

                              this.sitedata.update_user(new_user_profile);
                              this.profile_loaded = true;
                            });
                        });
                    });
                // }
              });
            });
        } else {
          this.profile_loaded = true;
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
}
