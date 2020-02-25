import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  sidebar;
  menuItems: any[];

  constructor() { }

  ngOnInit() {
  }



  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };



}
