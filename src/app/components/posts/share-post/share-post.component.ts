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
  third_person = false;
  content = '';

  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.url.subscribe(
      (current_url) => {
        if (current_url.length > 1) {
          var current_username = current_url[1].toString();
          this.auth.get_request_base().subscribe(
            (request_base_) => {
              if (request_base_ == null || request_base_.user.username != current_username) {
                this.third_person = true;
              } else {
                this.third_person = false;
              }
            }
          )
        }
      }
    )
  }
  ngOnInit(): void {
  }

  share_post() {
    if(this.content.length != 0){
      this.database.create_post(this.content);
      this.content = '';
    }else{
      alert("Post content is empty !")
    }
  }

  
  coming_soon(){
    alert('Coming soon !');
  }
}
