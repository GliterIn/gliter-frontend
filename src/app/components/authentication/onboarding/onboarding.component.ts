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
    if(this.user != null && this.validate_user()){
      this.auth.onboard_user(this.user);
    }
  }

  validate_user():boolean{
    if(this.user == null) return false;

    if(this.is_empty_string(this.user.bio,'Bio') || 
      this.is_empty_string(this.user.cover_picture,'Cover Picture') ||
      this.is_empty_string(this.user.location, "Location") ||
      this.is_empty_string(this.user.name, "Name") ||
      this.is_empty_string(this.user.occupation, "Occupation") || 
      this.is_empty_string(this.user.username, "Username") || 
      this.is_empty_string(this.user.gender, "Gender") || 
      this.is_empty_string(this.user.relationship, "Relationship")
    ){
      return false;
    }
    
    
    return true;
  }
  is_empty_string(data:string,name:string):boolean{
    if(data.length==0){
      alert("You can't have empty " + name);
      return true;
    }
    return false;
  }
}
