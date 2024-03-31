import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddFavoriteCharacter, CharacterDetail, GetCharacter} from "../action/rickandmorty.action";
import {Character, CharacterStateModel, GetCharacterApiResponse} from "../models/character";
import {RickandmortyService} from "../services/rickandmorty.service";

@State<CharacterStateModel>({
  name: 'rickandmorty',
  defaults:
    {
      favoriteCharacter: [] as Character[],
      character:{} as GetCharacterApiResponse,
      selectedCharacter:{} as Character,
      episode:[] as string[]
    }

})
@Injectable()
export class RickandmortyState{

  constructor(private rickandmortyService:RickandmortyService) {
  }
  @Selector()
  static getFavoriteCharacter(state:CharacterStateModel){
  return state.favoriteCharacter
}

  @Selector()
  static getAllCharacter(state:CharacterStateModel):GetCharacterApiResponse{
    return state.character
  }

  @Selector()
  static characterDetails(state:CharacterStateModel){
    return state.selectedCharacter
  }

  @Selector()
  static episode(state:CharacterStateModel){
    return state.episode
  }
  @Action(AddFavoriteCharacter)
  addFavorite(ctx:StateContext<CharacterStateModel>,{payload}:AddFavoriteCharacter){
  ctx.patchState({favoriteCharacter:[...ctx.getState().favoriteCharacter,payload]})
}

  @Action(GetCharacter)
  getCharacter(ctx:StateContext<CharacterStateModel>,{}:GetCharacter){
  return this.rickandmortyService.getAllCharacter().subscribe(
    (response)=>{
       ctx.patchState({character:response})
    })
}
  @Action(CharacterDetail)
  characterDetail(ctx:StateContext<CharacterStateModel>,{payload}:CharacterDetail){
    return this.rickandmortyService.getCharacterDetails(payload).subscribe(
      (response)=>{
        ctx.patchState({episode:response.episode.map((item)=> item.split('/')[5])})
        ctx.patchState({selectedCharacter:response})
      })
  }
}
