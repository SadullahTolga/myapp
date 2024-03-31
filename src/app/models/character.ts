export interface Character{
  id:number,
  name:string,
  status:string,
  species:string,
  type:string,
  gender:string,
  origin:LocationandOrigin,
  location:LocationandOrigin,
  image:string,
  episode:string[],
  url:string,
  created:string
}

export interface GetCharacterApiResponse{
  info:Info
  results?:Character[]
}

export interface Info{
  count:number,
  pages:number,
  next:string,
  prev:null
}

export interface LocationandOrigin {
  name:string,
  url:string,
}

export interface CharacterStateModel{
  character:GetCharacterApiResponse
  favoriteCharacter:Character[]
  selectedCharacter:Character
  episode:string[]
}
