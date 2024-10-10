import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result, RMCharacter } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters: Result[] | null = null;
  currentPage: number = 1;
  totalPages: number = 0;
  errorMessage: string = ''; 

  //Las subscripciones las guardamos acá para desus todas juntas.
  private subscription: Subscription = new Subscription();

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(searchTerm: string = ''): void {
    const characterSubscription = this.charactersService.searchCharacters(searchTerm, this.currentPage)
      .subscribe(
        (data: RMCharacter) => {
          this.characters = data.results;
          this.totalPages = data.info.pages;
          this.errorMessage = ''; 
        },
        (error) => {
          console.log('Hubo un error al cargar personajes:', error.message);
          this.errorMessage = error.message;
        }
      );
  
    this.subscription.add(characterSubscription);
  }

  onSearch(searchTerm: string): void {
    const searchSubscription = this.charactersService.searchCharacters(searchTerm, this.currentPage)
      .subscribe(
        (data: RMCharacter) => {
          this.characters = data.results;
          this.totalPages = data.info.pages; 
          this.errorMessage = ''; 
        },
        (error) => {
          console.log('Hubo un error en la búsqueda:', error.message);
          this.errorMessage = error.message;
        }
      );
  
    this.subscription.add(searchSubscription);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
