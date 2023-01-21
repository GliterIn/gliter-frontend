import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page-header',
  templateUrl: './profile-page-header.component.html',
  styleUrls: ['./profile-page-header.component.css']
})
export class ProfilePageHeaderComponent implements OnInit {

  user: UserProfile | null;
  third_person = false;
  @Input('is_editing') is_editing=false; 
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute) {
    this.user = null;

    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        this.auth.get_current_user().subscribe(
          (logged_in_user) => {
            if (logged_in_user == null || logged_in_user.username != current_username) {
              this.third_person = true;
              this.database.get_user_details(current_username).subscribe(
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

}
