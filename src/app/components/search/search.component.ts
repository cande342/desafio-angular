import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
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
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.onSearch(value);
    });
  }

  onSearch(searchTerm: string): void {
    this.searchEvent.emit(searchTerm);
  }
}