import { Component, OnInit } from '@angular/core';
import { UserSettings } from 'src/app/models/Settings.model';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: UserProfile | null;
  user_settings: UserSettings;
  is_loaded = false;
  constructor(public auth: AuthenticationService, public db: DatabaseService) {
    this.user = null;
    this.user_settings = <UserSettings>{};
    this.auth.get_current_user().subscribe((user_) => {
      this.user = user_;
      if (user_ != null) {
        this.db.get_user_settings().subscribe(
          (settings_) => {
            this.is_loaded = true;
            this.user_settings = settings_;
          }
        )
      }
    });
  }

  ngOnInit(): void {
  }

  save_data() {
    this.is_loaded = false;
    this.db.set_user_settings(this.user_settings).subscribe(
      (data_) => {
        if (data_.length != 0) {
          alert("Settings Updated.");
          this.db.get_user_settings().subscribe(
            (settings_) => {
              this.is_loaded = true;
              this.user_settings = settings_;
            }
          )
        }
      }
    );
  }
}
