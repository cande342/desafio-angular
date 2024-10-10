import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RMCharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private _httpClient: HttpClient) { }

  searchCharacters(name: string, page: number): Observable<RMCharacter> {
    return this._httpClient.get<RMCharacter>(`${this.apiUrl}/?name=${name}&page=${page}`)
      .pipe(
        catchError(error => {
          console.log('Hubo un error:', error.error.message);
          return throwError(() => new Error('Error en la solicitud de búsqueda'));
        })
      );
  }
}
