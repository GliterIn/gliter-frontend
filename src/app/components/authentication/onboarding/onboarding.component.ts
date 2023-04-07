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
  url_regex =  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?.*)?$/;
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

    if(!this.is_valid_length(this.user.bio,'Bio',5,40) || 
      !this.is_valid_length(this.user.location, "Location",3,20) ||
      !this.is_valid_length(this.user.name, "Name",3,20) ||
      !this.is_valid_length(this.user.occupation, "Occupation",3,20) || 
      !this.is_valid_length(this.user.username, "Username",3,15)
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
  is_valid_length(data:string,name:string,minimum:number,maximum:number):boolean{
    if(data.length>maximum){
      alert(name + " is very long.");
      return false;
    }
    if(data.length<minimum){
      alert(name + " is very short.");
      return false;
    }
    return true;
  }

  is_valid_url(url:string){
    return this.url_regex.test(url)
  }
}
