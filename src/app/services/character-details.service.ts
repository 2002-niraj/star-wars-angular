import { Injectable, Pipe } from '@angular/core';
import { StarWarsCharacter } from '../interface/character.model';
import { filter, forkJoin, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsService {
 
  constructor(private http:HttpClient) { }

  private AllCharacter :any = [];


  getCharacterImageByName(name:string):Observable<string>{
    return this.getAllCharacters().pipe(
      map((characters)=> characters.find((char)=>char.name?.toLowerCase() === name.toLowerCase())),
      filter((character)=>!!character),
      map((character)=>character?.image)
    )
  }

  getAllCharacters() :Observable < any[] > {

    if(this.AllCharacter && this.AllCharacter.length){
      return of(this.AllCharacter)
    }
    else{
         return this.http.get<any[]>('https://akabab.github.io/starwars-api/api/all.json')
     .pipe( tap((characters)=>{
      this.AllCharacter = characters
     }))
    }


  }

  fetchCharacterDetails(character:StarWarsCharacter):Observable<any>{

    const { homeworld, films, species, vehicles, starships,name,height,mass,hair_color,skin_color,eye_color,birth_year,gender } = character;

    const result = {
     homeworldRes: this.http.get(homeworld),
     imageUrl:this.getCharacterImageByName(name),
     filmsRes:films.length ? forkJoin(films.map((film)=>this.http.get(film))): of([]),
     speciesRes:species.length ? forkJoin(species.map((specie)=>this.http.get(specie))): of([]),
     vehiclesRes:vehicles.length ? forkJoin(vehicles.map((vehicle)=>this.http.get(vehicle))): of([]),
     starshipsRes:starships.length ? forkJoin(starships.map((starship)=>this.http.get(starship))): of([]),
    }

    return forkJoin(result);

  }
}
