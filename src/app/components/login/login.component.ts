import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';

import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: UserProfile|null;
  constructor(public auth:AuthenticationService, public router: Router) {
    this.user = null;

    this.auth.logged_in_user.subscribe(
      (data) => {
        this.user = data;
        if(data != null){
          if(data.is_onboarded){
            this.router.navigate(["/profile",this.user!['username']]);
          }else{
            this.router.navigate(["/onboarding"]);
          }
        }
      }
    )
  }

  ngOnInit(): void {

  }
}