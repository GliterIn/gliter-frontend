import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Post } from 'src/app/models/Post.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

interface MyReaction{
  reaction_type:string;
  show_icon: boolean;
};

@Component({
  selector: 'app-profile-page-posts',
  templateUrl: './profile-page-posts.component.html',
  styleUrls: ['./profile-page-posts.component.css']
})
export class ProfilePagePostsComponent implements OnInit {

  user: UserProfile | null = null;
  logged_in_user : UserProfile | null = null;
  third_person = false;
  viewing_feed = false;
  posts: Post[] = [];
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public activatedRoute: ActivatedRoute, public sitedata: SitedataService) {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        if (current_url[0].toString() == "profile") {
          this.viewing_feed = false;
          this.initialize_profile_page_posts(current_url);
        } else if (current_url[0].toString() == "feed") {
          this.viewing_feed = true;
          this.initialize_feed_posts(current_url);
        }
      }
    )
  }

  ngOnInit(): void {
  }

  initialize_profile_page_posts(current_url: UrlSegment[]): void {
    var current_username = current_url[1].toString();
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        this.third_person = (request_base_ == null || request_base_.user.username != current_username);

        if(request_base_){
          this.logged_in_user = request_base_.user;
        }
        if (this.third_person) {
          this.sitedata.user_on_screen.subscribe(
            (current_user) => {
              this.sitedata.posts_on_screen.subscribe(
                (response_post) => {
                  this.user = current_user;
                  this.posts = response_post;
                }
              )
            }
          )
        } else {
          if (request_base_) {
            this.user = request_base_.user;
            this.sitedata.logged_user_posts.subscribe(
              (logged_user_posts_) => {
                this.posts = logged_user_posts_;
              }
            )
          }
        }
      }
    )
  }
  initialize_feed_posts(current_url: UrlSegment[]): void {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if (request_base_) {
          this.logged_in_user = request_base_.user;
          this.user = request_base_.user;
          this.database.get_user_feed().subscribe(
            (posts_) => {
              this.posts = posts_;
            }
          )
        }
      }
    )
  }

  add_reaction(post_id: number, reaction_type: string) {
    this.database.create_reaction(post_id, reaction_type);
  }


  get_total_reaction_count(post: Post) {
    var total_count = 0;
    for (let x in post.reactions) {
      total_count += post.reactions[x].length;
    }
    return total_count;
  }
  get_reaction_url(reaction_type: string) {
    if (reaction_type == 'LIKE') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_1.png';
    } else if (reaction_type == 'HAHA') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_2.png'
    } else if (reaction_type == 'LOVE') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_3.png'
    } else if (reaction_type == 'CARE') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_4.png'
    } else if (reaction_type == 'ANGRY') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_5.png'
    } else if (reaction_type == 'SAD') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_6.png'
    } else if (reaction_type == 'WOW') {
      return 'https://radiustheme.com/demo/html/cirkle/media/figure/reaction_7.png'
    }
    alert("Unknown Reaction Type : " + reaction_type);
    return "Unknown Reaction Type";
  }

  get_my_reaction(post: Post):MyReaction {
    if (this.logged_in_user != null) {
      for (let reaction_type in post.reactions) {
        for (let i=0;i < post.reactions[reaction_type].length; i++) {
          if (this.logged_in_user.username == post.reactions[reaction_type][i]) {
            return <MyReaction>{reaction_type : reaction_type, show_icon : true};
          }
        }
      }
    }
    return <MyReaction>{reaction_type : "React !", show_icon : false};
  }

  capitalize_first_letter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  get_list_of_reactees(post:Post){
    var users = [];
    for (let reaction_type in post.reactions){
      for (let i=0;i < post.reactions[reaction_type].length; i++) {
        users.push('@'+post.reactions[reaction_type][i]);
      }
    }
    return users.toString();
  }
}
