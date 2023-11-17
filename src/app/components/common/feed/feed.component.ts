import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  user: UserProfile | null = null;
  constructor(public auth:AuthenticationService, public title:Title) { 
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if(request_base_){
          this.user = request_base_.user;
          this.title.setTitle('Feed');
        }
      }
    )
  }

  ngOnInit(): void {
    
  }

}
