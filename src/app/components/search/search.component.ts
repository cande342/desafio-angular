import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      searchTerm: ['']
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