import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Character, GetCharacterApiResponse} from "../../models/character";
import {RickandmortyService} from "../../services/rickandmorty.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {CharacterDetail} from "../../action/rickandmorty.action";
import {RickandmortyState} from "../../state/rickandmorty.state";
import {Observable} from "rxjs";
import {CharacterService} from "../../services/character.service";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent implements OnInit{

  @Select(RickandmortyState.characterDetails)
  character$:Observable<Character>

  @Select(RickandmortyState.episode)
  episode$:Observable<any>

  constructor(
    private route: ActivatedRoute,
    private store:Store,
    public characterService:CharacterService) {
  }
  ngOnInit(): void {
    this.characterDetails()
  }
 private characterDetails(){
    const characterId = this.route.snapshot.paramMap.get('id')
   this.store.dispatch(new CharacterDetail(String(characterId)))

  }

}
