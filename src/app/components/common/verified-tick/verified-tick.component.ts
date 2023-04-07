import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified-tick',
  templateUrl: './verified-tick.component.html',
  styleUrls: ['./verified-tick.component.css']
})
export class VerifiedTickComponent implements OnInit {

  @Input('condition') condition:boolean|unknown = false;
  @Input('is_admin') is_admin:boolean|unknown = false;
  @Input('size') size:string|unknown = '20px';
  
  verified = 'assets/img/verified.png';
  verified_admin = 'assets/img/verified-2.png';
  title = "Verified Account";
  constructor() { }

  ngOnInit(): void {
    if(this.is_admin){
      this.title = "Admin";
      this.verified = this.verified_admin;
    }
  }

}
