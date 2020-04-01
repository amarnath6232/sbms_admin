import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Subscription } from 'rxjs';
import * as $ from "jquery";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    mobile_menu_visible: any = 0;
    windowSize = $(window).width();
    hide_2_navbar = true;
    userName = null;
    unsub_2_navbar: Subscription;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowSize = event.target.innerWidth;
        this.window(event.target.innerWidth);
    }

    constructor(
        private auth: AuthenticationService) {
    }

    ngOnInit() {
        this.window(this.windowSize);
        this.displayUserName();
        this.subs_navbar();
    }

    subs_navbar() {
        this.unsub_2_navbar = this.auth.hide2navbar.subscribe(val => {
            this.hide_2_navbar = val;
        })
    }

    displayUserName() {
        this.auth.userName.subscribe(val => {
            this.userName = val;
        })
    }


    window(windowSize: Number) {
        if (windowSize < 991) {
            $(document).ready(function () {
                $(".navbarTitle").hide("fast");
                $("#navbarTitleSmall").show();
            });
        } else {
            $(document).ready(function () {
                $(".navbarTitle").show("fast");
                $("#navbarTitleSmall").hide();
            });
        }
    }


    // showSideBar() {
    //     $(document).ready(function () {
    //         $("#sidebar, #content").toggleClass('active');
    //     });
    // }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.unsub_2_navbar.unsubscribe();
    }

}
