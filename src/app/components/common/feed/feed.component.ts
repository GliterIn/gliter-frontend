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

  user: UserProfile | null;
  constructor(public auth:AuthenticationService, public title:Title) { 
    this.user = null;
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
        this.title.setTitle('Feed');
      }
    )
  }

  ngOnInit(): void {
    
  }

}
