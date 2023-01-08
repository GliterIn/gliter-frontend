import { Component, OnInit } from '@angular/core';
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
  user: UserProfile|null;
  content = '';
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.user = null;
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
      }
    )

  }
  ngOnInit(): void {
  }

  share_post(){
    this.database.create_post(this.content);
  }

}
