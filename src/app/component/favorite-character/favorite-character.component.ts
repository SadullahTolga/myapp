import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Character} from "../../models/character";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-favorite-character',
  templateUrl: './favorite-character.component.html',
  styleUrl: './favorite-character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCharacterComponent implements OnInit{

  favoriteCharacter:Character[]=[]
  page:number=1
  count:number=0
  tableSize:number=4
  user$=this.authService.currentUser$
  constructor(
    private authService:AuthenticationService,
    public characterService:CharacterService) {
  }
  ngOnInit(): void {
    this.user$.subscribe((response)=>
      this.getFavoriteCharacter(response?.email))
  }

  onTableDataChange(event:any){
    this.page=event
    this.getFavoriteCharacter()
  }

  removeFromFavorite(id:number,email:any){
    this.favoriteCharacter.forEach((element,index)=> {
      if (element.id === id) this.favoriteCharacter.splice(index, 1)
    })
    localStorage.setItem(email,JSON.stringify(this.favoriteCharacter))
  }

  getFavoriteCharacter(value?:any){
    this.favoriteCharacter=JSON.parse(String(localStorage.getItem(value)))
  }
}
