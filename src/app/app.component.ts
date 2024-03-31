import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
  user$=this.authService.currentUser$
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token')
      this.router.navigate(['/login']);
    });
  }
}
