import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  user: UserProfile | null;
  posts: Post[] = [];
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.user = null;
    auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
      }
    )
    this.database.posts.subscribe(
      (data) => {
        this.posts = data;
      }
    )
  }

  ngOnInit(): void {
  }

}
