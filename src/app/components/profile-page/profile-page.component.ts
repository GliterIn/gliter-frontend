import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  third_person = false;
  user: string = '';
  tab_name = '';
  constructor(public database: DatabaseService, public activatedRoute: ActivatedRoute, public router: Router, public sitedata: SitedataService) {

  }
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        if (current_url.length >= 3) {
          var current_tab = current_url[2].toString();
          this.tab_name = current_tab;
        }
        this.user = current_username;
        this.database.get_user_details(current_username).subscribe(
          (user) => {
            this.sitedata.user_on_screen.next(user);

            this.database.get_user_following(current_username).subscribe(
              (all_followers) => {
                this.sitedata.following_on_screen.next(JSON.parse(all_followers));
              }
            )

            this.database.get_user_followers(current_username).subscribe(
              (all_followers) => {
                this.sitedata.followers_on_screen.next(JSON.parse(all_followers));
              }
            )

            this.database.get_user_posts(current_username).subscribe(
              (all_posts) => {
                this.sitedata.posts_on_screen.next(all_posts);
              }
            )
          },
          (error) => {
            console.log(error.error);
            this.router.navigate(['feed']);
          }
        )

      }
    )
  }

}
