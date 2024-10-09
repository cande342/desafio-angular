import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Result } from 'src/app/models/character.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() characters: Result[] = [];  // Recibe los personajes desde el componente padre
  @Input() searchTerm: string = '';     // Recibe el término de búsqueda desde el componente padre
  @Input() currentPage: number = 1;     // Página actual, recibida del componente padre
  @Input() charactersPerPage: number = 10; // Número de personajes a mostrar por página

  filteredCharacters: Result[] = [];

  ngOnInit(): void {
    this.filterCharacters();
  }

  ngOnChanges(): void {
    this.filterCharacters();  // Filtra personajes cuando cambie el término de búsqueda o la página
  }

  filterCharacters(): void {
    if (this.searchTerm) {
      this.filteredCharacters = this.characters.filter(character => 
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.characters;  // Si no hay término de búsqueda, muestra todos
    }
  }

  get paginatedCharacters(): Result[] {
    const startIndex = (this.currentPage - 1) * this.charactersPerPage;
    return this.filteredCharacters.slice(startIndex, startIndex + this.charactersPerPage);
  }

  get totalFilteredPages(): number {
    return Math.ceil(this.filteredCharacters.length / this.charactersPerPage);
  }
}
