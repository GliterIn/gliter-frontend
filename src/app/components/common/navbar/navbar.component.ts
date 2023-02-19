import { Component, OnInit } from '@angular/core';
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
  user: UserProfile|null;
  search_results: UserProfile[];
  search_query:string='';
  show_mobile_search=false;
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

  search_users(){
    if(this.search_query.length != 0){
      this.database.get_user_results(this.search_query).subscribe(
        (search_results) => {
          this.search_results = search_results;
          console.log(search_results);
          this.search_query = '';
        }
      )
    }
  }

  ngOnInit(): void {

  }
}
