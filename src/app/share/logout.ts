import { Router } from "@angular/router";
import { AuthenticationService } from '../Services/authentication.service';

export class Logout {
    constructor(private router: Router,
        private auth: AuthenticationService) { }

    logout() {
        this.auth.token = null;
        localStorage.removeItem('token');
        this.router.navigate(['/signIn']);
    }
}