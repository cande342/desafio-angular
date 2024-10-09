import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RMCharacter } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
  searchForm: FormGroup;
  characters: RMCharacter | null = null;
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 10; 

  constructor(private fb: FormBuilder, private charactersService: CharactersService) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  searchCharacters(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    this.charactersService.searchCharacters(searchTerm, this.currentPage, this.itemsPerPage).subscribe(data => {
      this.characters = data;
      this.totalPages = data.info.pages; 
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchCharacters();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchCharacters(); 
    }
  }

  get searchTermControl(): FormControl {
    return this.searchForm.get('searchTerm') as FormControl;
  }
}
