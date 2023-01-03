import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-be-right-back',
  templateUrl: './be-right-back.component.html',
  styleUrls: ['./be-right-back.component.css']
})
export class BeRightBackComponent implements OnInit {
  logged_in=true;
  constructor(public auth:AuthenticationService) {
    this.auth.logged_in.subscribe(
      (data) => {
        this.logged_in=data;
        if(!data){
          window.location.href = "/";
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
