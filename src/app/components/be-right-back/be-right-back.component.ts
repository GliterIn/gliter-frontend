import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-be-right-back',
  templateUrl: './be-right-back.component.html',
  styleUrls: ['./be-right-back.component.css']
})
export class BeRightBackComponent implements OnInit {
  logged_in=true;
  constructor(public auth:AuthenticationService, public router:Router) {
    this.auth.logged_in.subscribe(
      (data) => {
        this.logged_in=data;
        if(!data){
          this.router.navigate(["/"]).then(
            ()=>{
              window.location.reload();
            }
          )
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
