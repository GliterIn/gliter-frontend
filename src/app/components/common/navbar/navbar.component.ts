import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserProfile | null = null;
  
  search_results: UserProfile[] = [];
  search_query: string = '';

  show_mobile_search = false;


  request_count = 0;
  follow_requests: UserProfile[] = [];
  private searchSubject = new Subject<string>();
  isDropdownOpen = false;


  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService, public sitedata: SitedataService) {
    this.auth.get_request_base().subscribe(
      (request_base_) => {
        if(request_base_)
          this.user = request_base_.user;
      }
    )
    this.sitedata.logged_user_follow_requests.subscribe(
      (follow_requests_) => {
        this.follow_requests = follow_requests_;
      }
    )
  }

  triggerDropdown() {
    if (this.isDropdownOpen == false) {
      this.isDropdownOpen = true;
    }
  }

  search_users() {
    if (this.search_query.length != 0) {
      this.database.get_user_results(this.search_query).subscribe(
        (search_results) => {
          this.search_results = search_results;
          if (this.search_results.length != 0) {
            this.triggerDropdown();
          }
        }
      )
    }
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500) // Delay for 500 milliseconds
    ).subscribe((searchText: string) => {
      // Invoke your search function here with searchText
      if (searchText.length == 0) {
        this.isDropdownOpen = false;
      } else {
        this.search_results = [];
        this.search_query = searchText;
        this.search_users();
      }
    });

  }

  onSearch(event: KeyboardEvent) {
    const searchQuery = (event.target as HTMLInputElement).value.trim();
    this.searchSubject.next(searchQuery);
  }


  approve_user(username:string){
    this.database.approve_follow(username).subscribe(
      (data) => {
        if(data == "OK"){
          this.database.get_user_follow_requests().subscribe(
            (follow_request_) => {
              this.sitedata.logged_user_follow_requests.next(follow_request_.users);
            }
          )
        }
      }
    )
  }
}
