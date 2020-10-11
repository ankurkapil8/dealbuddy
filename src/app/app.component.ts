import { Component, OnInit } from '@angular/core';
import {Login} from "./models/login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginInfo:Login = {
      first_name:'User',
      last_name:'Profile',
      avatar:'ay.jpeg',
      title:'Best User'
  };

  public showTopNavbar = true;
  public currentYear = new Date().getFullYear();
 
  ngOnInit() {
  }

  setTheInputValue(){
      let currentURL = window.location.pathname;

      if( currentURL === '/profile'){
          this.showTopNavbar = false;
      }
      
  }

}
