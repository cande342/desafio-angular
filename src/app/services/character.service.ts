import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RMCharacter } from '../models/character.model';
//Servicio para la version 1
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<RMCharacter> {
    return this.http.get<RMCharacter>(`${this.apiUrl}/?page=${page}`)
      .pipe(
        catchError(error => {
          console.log('Hubo un error:', error.error.message);
          return throwError(() => new Error('Error en la solicitud'));
        })
      );
  }
}