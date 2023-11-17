import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page-details',
  templateUrl: './profile-page-details.component.html',
  styleUrls: ['./profile-page-details.component.css']
})
export class ProfilePageDetailsComponent implements OnInit {

  user_on_screen: UserProfile | null = null;
  third_person = false;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute,
    public sitedata: SitedataService) {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        if (current_url.length > 1) {
          var current_username = current_url[1].toString();
          this.auth.get_request_base().subscribe(
            (request_base_) => {
              if (request_base_ == null || request_base_.user.username != current_username) {
                this.third_person = true;
                this.sitedata.user_on_screen.subscribe(
                  (current_user_) => {
                    if(current_user_)
                      this.user_on_screen = current_user_;
                  }
                )
              } else {
                this.user_on_screen = request_base_.user;
                this.third_person = false;
              }
            }
          )
        }
      }
    )
  }
  ngOnInit(): void {
  }

}
