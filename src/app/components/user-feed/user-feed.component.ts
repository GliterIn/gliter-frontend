import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { User } from 'src/app/models/User.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {

  user: User;
  posts: Post[] = [];
  constructor(public database: DatabaseService,
              public util: UtilsService, 
              public auth: AuthenticationService) {
    this.user = auth.get_current_user();
    this.database.posts.subscribe(
      (data) => {
        this.posts = data;
      }
    )
  }

  ngOnInit(): void {
  }

}
