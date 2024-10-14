import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  filterForm: FormGroup;

  //Emite un evento cuando hay un termino de busqueda y tambien cuando este se cambia
  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  @Output() isTouched: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: ['']  
    });
  }

  //Realizaba una llamada innecesaria al servicio.
  ngOnInit(): void {
    //Su funcionalidad principal, emitir el termino de busqueda y avisar de los cambios.
    this.filterForm.get('name')?.valueChanges.subscribe(value => {
      this.searchTerm.emit(value);
      this.isTouched.emit(true); 
    });
  }
}