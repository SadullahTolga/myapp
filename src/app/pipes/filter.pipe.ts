import {Pipe, PipeTransform} from "@angular/core";
import {Character} from "../models/character";

@Pipe({
  name:'filter'
})

export class FilterPipe implements PipeTransform{
  transform(character: Character[],filterText:string): Character[] {
    if(character?.length === 0 || filterText === ''){
      return character;
    }else{
      return character.filter((character) =>
        character.name.toLowerCase().includes(filterText.toLowerCase())||
        character.species.toLowerCase().includes(filterText.toLowerCase())||
        character.gender.toLowerCase().includes(filterText.toLowerCase())||
        character.status.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }

}
