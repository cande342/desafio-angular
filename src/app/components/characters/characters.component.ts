import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Result, RMCharacter } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent implements OnInit, OnDestroy {
  //Este es el compontente principal, el que maneja toda la logica del servicio y pasa datos a Search y List.
  //La ppal diferencia con la primera versión, es el método para cargar los personajes. En este caso, se actualiza
  //tan pronto el término de búsquedda cambia, y ningun tipo de lógica se delega al componente character-list,
  //que sólo está encargado de mostrar lo que su padre le envía(El arreglo de pjs ya filtrado y paginado)

  characters: Result[] | null = null;
  currentPage: number = 1;
  totalPages: number = 0;
  errorMessage: string = '';
  searchTerm: string = ''; 

  private subscription: Subscription = new Subscription();

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.loadCharacters(); 
  }

// Método que carga personajes en base al término de búsqueda y la página actual.
// A diferencia del anterior, recibe como parámetro el termino a buscar.
  loadCharacters(searchTerm: string = this.searchTerm): void {
    //El servicio acepta 2 parametros: el termino q pasamos x parametro y la Página actual(por defecto 1)
    const characterSubscription = this.charactersService.searchCharacters(searchTerm, this.currentPage)
      .subscribe(
        (data: RMCharacter) => {
          this.characters = data.results;
          this.totalPages = data.info.pages;
          this.errorMessage = '';
        },
        (error) => {
          console.log('Hubo un error al cargar personajes:', error.message);
          this.errorMessage = error.message;
        }
      );

    this.subscription.add(characterSubscription);
  }

 // Éste método funciona igual que el anterior sólo que cuando recibe un término,
// actualiza la variable searchTearm para que LoadCharacter funcione correctamente
  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm; 
    this.currentPage = 1; //Se coloca uno para que comience desde la primera página
    this.loadCharacters(this.searchTerm); 
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters(this.searchTerm);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters(this.searchTerm); 
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
