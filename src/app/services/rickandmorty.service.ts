import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Character, GetCharacterApiResponse} from "../models/character";

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  baseURL='https://rickandmortyapi.com/api'

  constructor(private httpClient:HttpClient) {}

  getAllCharacter():Observable<GetCharacterApiResponse>{
    return this.httpClient.get<GetCharacterApiResponse>(this.baseURL+'/character')
  }

  getCharacterDetails(id:any):Observable<Character>{
    return this.httpClient.get<Character>(this.baseURL+'/character/'+id)
  }
}
