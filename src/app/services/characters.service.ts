import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RMCharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  
  constructor(private _httpClient: HttpClient) { }

  searchCharacters(name: string): Observable<RMCharacter> {
    return this._httpClient.get<RMCharacter>(`${this.apiUrl}/?name=${name}`);
  }
}
