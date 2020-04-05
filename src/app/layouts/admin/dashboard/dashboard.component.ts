import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  unsub_route: Subscription;

  constructor(private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.spiner.next(false);
  }



}
