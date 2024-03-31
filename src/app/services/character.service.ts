import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private router:Router) { }

  characterDetails(id:number){
    this.router.navigate(['/details',id])
  }
  backToHomePage(){
    this.router.navigate(['/home'])
  }

}
