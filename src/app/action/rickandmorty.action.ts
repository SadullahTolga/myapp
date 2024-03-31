import {Character} from "../models/character";

export class AddFavoriteCharacter {
  static readonly type = '[Add Favorite Character] Add';
  constructor(public payload: Character) {
  }
}

export class GetCharacter{
  static  readonly  type ='[Get Character] Character'
}

export class CharacterDetail {
  static readonly type = '[Character Detail] CharacterDetail';
  constructor(public payload: any) {
  }
}
