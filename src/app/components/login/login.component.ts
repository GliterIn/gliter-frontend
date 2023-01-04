import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'firebase/auth';
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
        if(data != null){
          if(data.is_onboarded){
            this.router.navigate(["/brb"]);
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
