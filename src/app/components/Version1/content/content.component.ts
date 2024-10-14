import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Result } from 'src/app/models/character.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit, OnChanges {
  //Este componente recibe la lista d personajes y luego un termino 
  // Para filtrar en esa misma lista. 

  @Input() characters: Result[] = [];
  @Input() searchTerm: string = '';


  //Acá se gaurdan los pjs a mostrar. Filtrados.
  filteredCharacters: Result[] = [];

  ngOnInit(): void {
    this.filterCharacters();
  }

  //Está escuchando los input, cuando uno cambia (searchTerm), se vuelve a llamar a filtrar personajes.
  ngOnChanges(): void {
    this.filterCharacters();
  }


// Este método filtra los personajes según el término de búsqueda.
// Es decir, toma toda la lista de pjs disponibles que le dio homevs1, y entre ellos busca 
//el término enviado por searchTerm. Es una desventaja, porque tiene que cargar sí o sí
//Todos los personajes de la página antes de poder filtrarlos.
  filterCharacters(): void {
    if (this.searchTerm) {
      this.filteredCharacters = this.characters.filter(character => 
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.characters;
    }
  }
}
