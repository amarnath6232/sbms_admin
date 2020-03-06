import { Component, OnInit } from '@angular/core';

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
    const string: string = "asnasa";
  }

} 
