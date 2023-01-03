import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  is_logged_in = false;
  constructor(public auth:AuthenticationService, public router: Router) {
    this.auth.logged_in.subscribe(
      (data) => {
        this.is_logged_in = data;
        if(data == true){
          this.router.navigate(["/brb"]);
        }
      }
    )
  }

  ngOnInit(): void {

  }
}
