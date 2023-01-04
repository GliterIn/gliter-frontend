import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-be-right-back',
  templateUrl: './be-right-back.component.html',
  styleUrls: ['./be-right-back.component.css']
})
export class BeRightBackComponent implements OnInit {
  user: UserProfile|null;
  constructor(public auth:AuthenticationService, public router:Router) {
    this.user = null;
    this.auth.logged_in_user.subscribe(
      (data) => {
        if(!data){
          this.router.navigate(["/"]).then(
            ()=>{
              window.location.reload();
            }
          )
        }else{
          this.user = data;
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
