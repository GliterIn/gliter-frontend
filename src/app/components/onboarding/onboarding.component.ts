import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  user: UserProfile|null;
  constructor(public auth:AuthenticationService) { 
    this.user = null;
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
      }
    )
  }

  ngOnInit(): void {
  }

  save_data(){
    if(this.user != null){
      this.auth.onboard_user(this.user);
    }
  }
}
