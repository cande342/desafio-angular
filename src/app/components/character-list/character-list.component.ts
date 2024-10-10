import { Component, Input } from '@angular/core';
import { Result } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent {
  @Input() characters: Result[] | null = [];

}