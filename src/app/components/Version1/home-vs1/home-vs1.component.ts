import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-home-vs1',
  templateUrl: './home-vs1.component.html',
  styleUrls: ['./home-vs1.component.css']
})

export class HomeComponentVs1 implements OnInit {
  characters: Result[] = []; //Creamos el arreglo p almacenar todos los Result q traiga el service
  searchTerm: string = ''; //Acá guardamos lo q se escriba por el form
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

// Método q llama al servicio y carga los pjs, si no le damos un parámetro
// va a usar el valor de currentPage.
  loadCharacters(page: number = this.currentPage): void {
    this.characterService.getCharacters(page).subscribe(data => {
      this.characters = data.results; //Guardamos lo q trajo dentro de el array characters
      this.totalPages = data.info.pages; //Actualiza el total de pages según lo que nos dice el servicio(interfaz: info)
    });
  }

// Método q se va a llamar cada vez que cambie una letra en el buscador, basicamente un set
// Le pasamos por parámetro el nuevo término introducido
  onSearchTermChanged(term: string): void {
    this.searchTerm = term;
  }

//Avanzar a la siguiente, tiene una validacion para impedir que se exceda del total de paginas
//Cuando avanza, cambia el valor de current page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters(this.currentPage); //Acá llama al método central, que va a cargar los pjs de la nueva pagina.
    }
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters(this.currentPage);
    }
  }

 //Métodos específicos del navegador por página de Bootstrap: buscar x pagina y la cantidad de numeros que puedo elegir para 
 //Cambiar (En este caso rango de 5)

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCharacters(this.currentPage);
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const totalVisiblePages = 5;
    let startPage: number;

    if (this.currentPage <= Math.ceil(totalVisiblePages / 2)) {
      startPage = 1;
    } else if (this.currentPage + Math.floor(totalVisiblePages / 2) >= this.totalPages) {
      startPage = this.totalPages - totalVisiblePages + 1;
    } else {
      startPage = this.currentPage - Math.floor(totalVisiblePages / 2);
    }
    for (let i = 0; i < totalVisiblePages; i++) {
      if (startPage + i <= this.totalPages) {
        visiblePages.push(startPage + i);
      }
    }

    return visiblePages;
  }
}
