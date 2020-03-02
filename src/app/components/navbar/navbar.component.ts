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
    windowSize = $(window).width();

    userName = null;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowSize = event.target.innerWidth;
        this.window(event.target.innerWidth);
    }

    constructor(location: Location,
        private element: ElementRef,
        private router: Router,
        private auth: AuthenticationService) {
        this.location = location;
    }

    ngOnInit() {
        this.window(this.windowSize);
        this.displayUserName();
    }

    displayUserName(){
        this.auth.userName.subscribe(val=>{
            this.userName = val;
        })
    }


    window(windowSize: Number) {
        if (windowSize < 991) {
            $(document).ready(function () {
                $("#sidebar, #content").addClass('active');
                $(".navbarTitle").hide("fast");
                $("#navbarTitleSmall").show();
            });
        } else {
            $(document).ready(function () {
                $("#sidebar, #content").removeClass('active');
                $(".navbarTitle").show("fast");
                $("#navbarTitleSmall").hide();
            });
        }
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
