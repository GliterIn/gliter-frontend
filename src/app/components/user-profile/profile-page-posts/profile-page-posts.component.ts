import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Post } from 'src/app/models/Post.model';
import { Comment } from 'src/app/models/Comment.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

interface MyReaction {
  reaction_type: string;
  show_icon: boolean;
};

@Component({
  selector: 'app-profile-page-posts',
  templateUrl: './profile-page-posts.component.html',
  styleUrls: ['./profile-page-posts.component.css']
})
export class ProfilePagePostsComponent implements OnInit {

  user: UserProfile | null = null;
  logged_in_user: UserProfile | null = null;
  third_person = false;
  viewing_feed = false; 
  
  posts: Post[] = [];
  comments : {[id:number]:string} = {};
  writing_comment: {[id:number]:boolean} = {};
  comment_list: {[id:number]:Comment[]} = {};
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

        if (request_base_) {
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
    if (this.logged_in_user) {

      // Remove old reaction
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id != post_id) continue;
        if (!this.posts[i].reactions) continue;

        for (let current_type in this.posts[i].reactions) {
          if (!this.posts[i].reactions[current_type]) continue;

          var index = -1;

          for (let j = 0; j < this.posts[i].reactions[current_type].length; j++) {
            if (this.posts[i].reactions[current_type][j] == this.logged_in_user.username) {
              index = j;
              break;
            }
          }

          if (index != -1) {
            this.posts[i].reactions[current_type].splice(index, 1);
            if(this.posts[i].reactions[current_type].length == 0){
              delete this.posts[i].reactions[current_type]
            }
          }
        }
      }
    }
     this.database.create_reaction(post_id, reaction_type);
    
    if (this.logged_in_user) {
      
      // Add new reaction
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id == post_id) {
          if (this.posts[i].reactions[reaction_type])
            this.posts[i].reactions[reaction_type].push(this.logged_in_user.username);
          else
            this.posts[i].reactions[reaction_type] = [this.logged_in_user.username];
        }
      }
    }
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

  get_my_reaction(post: Post): MyReaction {
    if (this.logged_in_user != null) {
      for (let reaction_type in post.reactions) {
        for (let i = 0; i < post.reactions[reaction_type].length; i++) {
          if (this.logged_in_user.username == post.reactions[reaction_type][i]) {
            return <MyReaction>{ reaction_type: reaction_type, show_icon: true };
          }
        }
      }
    }
    return <MyReaction>{ reaction_type: "React !", show_icon: false };
  }

  capitalize_first_letter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  get_list_of_reactees(post: Post) {
    var users = [];
    for (let reaction_type in post.reactions) {
      for (let i = 0; i < post.reactions[reaction_type].length; i++) {
        users.push('@' + post.reactions[reaction_type][i]);
      }
    }
    return users.toString();
  }

  write_comment(id:number){
    if(this.database.request_base == null) return;
    this.database.create_comment(id, this.comments[id]).subscribe(
      (_) => {
        this.comments[id] = '';
        this.get_comments(id);
      }
    );
  }

  get_comments(id:number){
    this.database.get_comments(id).subscribe(
      (comments_) => {
        this.comment_list[id] = comments_;
      }
    )
    return true;
  }
  delete_comment(post_id:number,comment_id:number){
    this.database.delete_comment(post_id,comment_id).subscribe(
      (_) => {
        this.get_comments(post_id);
      }
    )
  }
}
