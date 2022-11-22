import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  is_logged_in = false;
  constructor(public auth:AuthenticationService) {
    this.auth.logged_in.subscribe(
      (data) => {
        this.is_logged_in = data;
      }
    )
  }

  ngOnInit(): void {
  }

}
