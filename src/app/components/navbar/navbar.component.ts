import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Logout } from 'src/app/share/logout';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    location: Location;
    mobile_menu_visible: any = 0;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        console.log(event.target.innerWidth);
        if (event.target.innerWidth < 991) {
            $(document).ready(function () {
                $("#sidebar, #content").addClass('active');
                $(".navbarTitle").hide("fast");
            });
        } else {
            $(document).ready(function () {
                $("#sidebar, #content").removeClass('active');
                $(".navbarTitle").show("fast");
            });
        }
    }

    constructor(location: Location,
        private element: ElementRef,
        private router: Router,
        private auth: AuthenticationService) {
        this.location = location;
    }

    ngOnInit() {
    }


    showSideBar() {
        $(document).ready(function () {
            $("#sidebar, #content").toggleClass('active');
        });
    }

    logout() {
        let logout = new Logout(this.router, this.auth);
        logout.logout();
    }

}
