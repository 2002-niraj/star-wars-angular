import { StarWarsCharacter } from './../../../interface/character.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { GenderFormatPipe } from '../../../pipes/gender-format.pipe';
import { MassFormatPipe } from '../../../pipes/mass-format.pipe';
import { HeightFormatPipe } from '../../../pipes/height-format.pipe';

@Component({
  selector: 'app-charactercard',
  standalone:true,
  imports: [CommonModule,GenderFormatPipe,MassFormatPipe,HeightFormatPipe],
  templateUrl: './charactercard.component.html',
  styleUrl: './charactercard.component.css'
})
export class CharactercardComponent {

  @Input() character!: StarWarsCharacter;
  isLoading = false

  @Output() selectedCharacter = new EventEmitter<StarWarsCharacter>();
   

showDetails(character: StarWarsCharacter) {
  this.isLoading = true;
  setTimeout(() => {
    this.selectedCharacter.emit(character);
    this.isLoading = false;
  }, 500); 
}

}
