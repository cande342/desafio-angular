import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Result } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
  characters: Result[] = []; 
  filteredCharacters: Result[] = []; 

  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  @Output() isTouched: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private characterService: CharacterService) {
    this.filterForm = this.fb.group({
      name: ['']  
    });
  }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe(data => {
      this.characters = data.results;
      this.filteredCharacters = this.characters; 
    });


    this.filterForm.get('name')?.valueChanges.subscribe(value => {
      this.searchTerm.emit(value);
      this.isTouched.emit(true); 
    });
  }
}