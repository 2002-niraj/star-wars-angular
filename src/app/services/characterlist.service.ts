import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StarWarsCharacter } from '../interface/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterlistService {

  constructor(private http:HttpClient) { }
   
  getCharacterList():Observable<StarWarsCharacter[]>{
    return this.http.get<StarWarsCharacter[]>('https://swapi.info/api/people')
  }
  
}
