import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Result } from 'src/app/models/character.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {
  @Input() characters: Result[] = [];
  @Input() searchTerm: string = '';
  @Input() currentPage: number = 1;
  @Input() charactersPerPage: number = 10; 

  filteredCharacters: Result[] = [];

  ngOnInit(): void {
    this.filterCharacters();
  }

  ngOnChanges(): void {
    this.filterCharacters();
  }

  filterCharacters(): void {
    if (this.searchTerm) {
      this.filteredCharacters = this.characters.filter(character => 
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.characters;
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
