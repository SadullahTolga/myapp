import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private router:Router,private authService:AuthenticationService) { }

  routePage(route:string,id?:number){
    console.log(route)
    id ? this.router.navigate([route,id]) :
    this.router.navigate([route])
  }

  auth(userName:string,password:string):Observable<boolean>{
      return this.authService.login(userName,password)
  }
}
