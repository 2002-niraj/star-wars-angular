import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { StarWarsCharacter } from '../../../interface/character.model';
import { CharacterDetailsService } from '../../../services/character-details.service';
import { MatIconModule } from '@angular/material/icon'
import { GenderFormatPipe } from '../../../pipes/gender-format.pipe';
import { MassFormatPipe } from '../../../pipes/mass-format.pipe';
import { HeightFormatPipe } from '../../../pipes/height-format.pipe';

@Component({
  selector: 'app-character-details',
  standalone:true,
  imports: [CommonModule, MatIconModule, GenderFormatPipe, HeightFormatPipe, MassFormatPipe],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css',
})
export class CharacterDetailsComponent {
  @Input() selectCharacter: StarWarsCharacter | null = null;
  @Output() unSelectCharacter = new EventEmitter<any>();
  allDetails: any;
  isLoading: boolean = false;
  private characterDetails = inject(CharacterDetailsService);


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectCharacter'] && this.selectCharacter) {
      this.isLoading = true;
      this.characterDetails
        .fetchCharacterDetails(this.selectCharacter)
        .subscribe({
          next: (result: any) => {
            const {
      
              homeworldRes,
              imageUrl,
              filmsRes = [],
              speciesRes = [],
              vehiclesRes = [],
              starshipsRes = [],
            } = result;

            

            
            if(this.selectCharacter){

              const {name,height,mass, hair_color,
              skin_color,
              eye_color,
              birth_year,
              gender} = this.selectCharacter
              
            this.allDetails = {
              name,
              height,
              mass,
              hair_color,
              skin_color,
              eye_color,
              birth_year,
              gender,
              homeworld: homeworldRes?.name || 'unknown',
              films: filmsRes.filter(Boolean).map((f: any) => f.title),
              species: speciesRes.filter(Boolean).map((s: any) => s.name),
              vehicles: vehiclesRes.filter(Boolean).map((v: any) => v.name),
              starships: starshipsRes.filter(Boolean).map((s: any) => s.name),
              imageUrl
            };

        
             this.isLoading = false;
            }
       

            
        
          },
        });
    }
  }

  onClose(){
    this.unSelectCharacter.emit(null);
  }
}
