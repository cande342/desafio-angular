import { Component, OnInit } from '@angular/core';
import { Result, RMCharacter } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent implements OnInit {
  characters: Result[] | null = null;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(searchTerm: string = ''): void {
    this.charactersService.searchCharacters(searchTerm, this.currentPage).subscribe((data: RMCharacter) => {
      this.characters = data.results;
      this.totalPages = data.info.pages;
    });
  }

  onSearch(searchTerm: string): void {
    this.charactersService.searchCharacters(searchTerm, this.currentPage).subscribe(data => {
      this.characters = data.results;
      this.totalPages = data.info.pages; 
    });
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
}