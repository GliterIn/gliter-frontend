import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css']
})
export class SharePostComponent implements OnInit {
  user: UserProfile | null;
  third_person = false;
  content = '';
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute) {
    this.user = null;
    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        this.auth.get_current_user().subscribe(
          (logged_in_user) => {
            if (logged_in_user == null || logged_in_user.username != current_username) {
              this.third_person = true;
            } else {
              this.user = logged_in_user;
              this.third_person = false;
            }
          }
        )
      }
    )
  }
  ngOnInit(): void {
  }

  share_post(){
    this.database.create_post(this.content);
    this.content = '';
  }

}
