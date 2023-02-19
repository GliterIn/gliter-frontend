import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page-content',
  templateUrl: './profile-page-content.component.html',
  styleUrls: ['./profile-page-content.component.css']
})
export class ProfilePageContentComponent implements OnInit {

  @Input('tab_name') tab_name='';
  constructor() {

  }

  ngOnInit(): void {
  }

}
