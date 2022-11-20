import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-my-profile-sidebar',
  templateUrl: './my-profile-sidebar.component.html',
  styleUrls: ['./my-profile-sidebar.component.css']
})
export class MyProfileSidebarComponent implements OnInit {

  user: User;
  constructor(public database: DatabaseService,
    public util: UtilsService,
    public auth: AuthenticationService) {
    this.user = this.auth.get_current_user();
  }

  ngOnInit(): void {
  }

}
