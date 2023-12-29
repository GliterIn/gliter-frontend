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
  
  user: UserProfile|null = null;
  constructor(public auth:AuthenticationService, public router: Router) {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if(request_base_ != null  ){
          this.user = request_base_.user;
          if(request_base_.user.is_onboarded){
            this.router.navigate(["/profile",this.user['username']]);
          }else{
            this.router.navigate(["/onboarding"]);
          }
        }else{
          this.router.navigate(["/onboarding"]);
        }
      }
    )
  }

  ngOnInit(): void {

  }
}