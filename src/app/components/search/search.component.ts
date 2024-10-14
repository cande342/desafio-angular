import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  //Simplificado: Formulario reactivo, al recibir un término o cuando este cambia
  //va a emitir un evento 
  @Output() searchEvent = new EventEmitter<string>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [
        '',
        [
          Validators.pattern(/^[a-zA-Z0-9]*$/)
        ]
      ]
    });
  }

  ngOnInit(): void {
    //Usamos una obsersvable para estar atentos al cambio
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.onSearch(value);
    });
  }

  onSearch(searchTerm: string): void {
    this.searchEvent.emit(searchTerm);
  }
}