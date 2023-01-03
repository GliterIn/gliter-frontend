import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Gliter';
  is_logged_in = false;
  constructor(public auth:AuthenticationService,private router: Router  ){
    this.auth.logged_in.subscribe(
      (data) => {
        this.is_logged_in = data;
        if(data == false && document.location.pathname.toString() == "/"){
          this.router.navigate(["/login"]);
        }
      }
    )
  }
  public loadScript(location: string) {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = location;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  ngOnInit(){
    this.loadScript('assets/js/vendor/jquery-3.6.0.min.js');
    this.loadScript('assets/js/vendor/bootstrap.bundle.min.js');
    this.loadScript('assets/js/vendor/modernizr-3.6.0.min.js');
    this.loadScript('assets/js/plugins/slick.min.js');
    this.loadScript('assets/js/plugins/nice-select.min.js');
    this.loadScript('assets/js/plugins/perfect-scrollbar.min.js');
    this.loadScript('assets/js/plugins/lightgallery-all.min.js');
    this.loadScript('assets/js/plugins/imagesloaded.pkgd.min.js');
    this.loadScript('assets/js/plugins/isotope.pkgd.min.js');
    this.loadScript('assets/js/main.js');
  }
}
