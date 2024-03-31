import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {CharacterService} from "./services/character.service";

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
    private characterService:CharacterService
  ) {}

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token')
      this.characterService.routePage('/login');
    });
  }
}
