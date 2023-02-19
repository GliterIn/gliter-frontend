import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: UserProfile|null;
  constructor(public auth:AuthenticationService, public util:UtilsService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.auth.get_current_user().subscribe(
      (current_user) => {
        this.user = current_user;
      }
    )
  }
  save_data(){
    if(this.user != null){
      this.auth.update_user(this.user);
    }
  }
}
