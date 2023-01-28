import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SitedataService } from 'src/app/service/sitedata.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  third_person = false;
  constructor(public database: DatabaseService, public activatedRoute: ActivatedRoute, public router:Router, public sitedata:SitedataService) {
    this.activatedRoute.url.subscribe(
      (current_url) => {
        var current_username = current_url[1].toString();
        this.database.get_user_details(current_username).subscribe(
          (user) => {
            this.sitedata.user_on_screen.next(user);
          },
          (error) =>{
            alert(error.error);
            router.navigate(['feed']);
          }
        )
      }
    )
  }
  ngOnInit(): void {
  }

}
