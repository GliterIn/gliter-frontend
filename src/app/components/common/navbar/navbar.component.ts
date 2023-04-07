import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserProfile | null;
  search_results: UserProfile[];
  search_query: string = '';
  show_mobile_search = false;
  private searchSubject = new Subject<string>();
  isDropdownOpen = false;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.user = null;
    this.search_results = [];
    this.auth.get_current_user().subscribe(
      (data) => {
        this.user = data;
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

}
