import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./component/landing/landing.component";
import {LoginComponent} from "./component/login/login.component";
import {SignUpComponent} from "./component/sign-up/sign-up.component";
import {HomeComponent} from "./component/home/home.component";
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {CharacterDetailsComponent} from "./component/character-details/character-details.component";
import {FavoriteCharacterComponent} from "./component/favorite-character/favorite-character.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:LandingComponent
  }
  ,
  {
    path:'login',
    component:LoginComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path:'sign-up',
    component:SignUpComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path:'home',
    component:HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path:'details/:id',
    component:CharacterDetailsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path:'favorite',
    component:FavoriteCharacterComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
