import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  characters: Result[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(page: number = this.currentPage): void {
    this.characterService.getCharacters(page).subscribe(data => {
      this.characters = data.results;
      this.totalPages = data.info.pages;
    });
  }

  onSearchTermChanged(term: string): void {
    this.searchTerm = term;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters(this.currentPage);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCharacters(this.currentPage);
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const totalVisiblePages = 5;
    let startPage: number;

    // Calcular el inicio de las páginas visibles
    if (this.currentPage <= Math.ceil(totalVisiblePages / 2)) {
      startPage = 1; // Si la página actual está en la primera mitad
    } else if (this.currentPage + Math.floor(totalVisiblePages / 2) >= this.totalPages) {
      startPage = this.totalPages - totalVisiblePages + 1; // Si está en la última mitad
    } else {
      startPage = this.currentPage - Math.floor(totalVisiblePages / 2); // Página central
    }

    // Generar las páginas visibles
    for (let i = 0; i < totalVisiblePages; i++) {
      if (startPage + i <= this.totalPages) {
        visiblePages.push(startPage + i);
      }
    }

    return visiblePages;
  }
}
