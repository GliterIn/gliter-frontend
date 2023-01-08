import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  third_person = false;
  posts: Post[] = [];
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute) {
    this.user = null;
    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        this.auth.get_current_user().subscribe(
          (logged_in_user) => {
            this.third_person = logged_in_user == null || logged_in_user.username != current_username;
            if(this.third_person){
              this.database.get_user_details(current_username).subscribe(
                (current_user) => {
                  this.database.get_user_posts(current_username).subscribe(
                    (response_post) => {
                      this.user = current_user;
                      this.posts = response_post;
                    }
                  )
                }
              )
            }else{
              this.user = logged_in_user;
              this.database.get_user_posts(this.user!.username).subscribe(
                (response_post) => {
                  this.posts = response_post;
                }
              )
            }
          }
        )
      }
    )
  }

  ngOnInit(): void {
  }

}
