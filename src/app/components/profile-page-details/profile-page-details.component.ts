import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page-details',
  templateUrl: './profile-page-details.component.html',
  styleUrls: ['./profile-page-details.component.css']
})
export class ProfilePageDetailsComponent implements OnInit {

  user: UserProfile|null;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.user = null;
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
      }
    )
  }
  ngOnInit(): void {
  }

}
