import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Character, GetCharacterApiResponse} from "../../models/character";
import {Select, Store} from "@ngxs/store";
import {GetCharacter} from "../../action/rickandmorty.action";
import {RickandmortyState} from "../../state/rickandmorty.state";
import {Observable} from "rxjs";
import {CharacterService} from "../../services/character.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{

  @Select(RickandmortyState.getAllCharacter)
  character$:Observable<GetCharacterApiResponse>

  user$=this.authService.currentUser$

  page:number=1
  count:number=0
  tableSize:number=10
  favoriteCharacter:Character[] = []
  filterValue:string=''

  constructor(
  private authService:AuthenticationService,
  public characterService:CharacterService,
  private store:Store
) {
}

  ngOnInit(): void {
    this.getAllCharacterInformation()
  }

  private getAllCharacterInformation(){
    this.store.dispatch(new GetCharacter())
  }

  onTableDataChange(event:any){
    this.page=event
    this.getAllCharacterInformation()
  }

  addFavoriteCharacter(character:Character,item:string|undefined|null){
    this.favoriteCharacter = [...this.favoriteCharacter,character]
    localStorage.setItem(String(item),JSON.stringify(this.favoriteCharacter))
  }
}
