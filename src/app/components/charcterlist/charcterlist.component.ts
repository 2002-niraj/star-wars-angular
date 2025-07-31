import { StarWarsCharacter } from './../../interface/character.model';
import { Component, inject} from '@angular/core';
import { CharacterlistService } from '../../services/characterlist.service';
import { CharactercardComponent } from './charactercard/charactercard.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterDetailsComponent } from './character-details/character-details.component';

@Component({
  selector: 'app-charcterlist',
  standalone:true,
  imports: [CharactercardComponent,MatPaginatorModule,MatProgressSpinnerModule,CharacterDetailsComponent],
  templateUrl: './charcterlist.component.html',
  styleUrl: './charcterlist.component.css'
})
export class CharcterlistComponent {

  charcterList:StarWarsCharacter[]=[]
  allDetails:any;
  selectCharacter:StarWarsCharacter |null = null

  isLoading = true;

  totalItems = 0;
  pageSize = 8;
  currentPage = 0;
  pagedCharacters: StarWarsCharacter[] = [];

  private characterlist = inject(CharacterlistService);
  

  ngOnInit(): void {

    this.isLoading = true
    this.characterlist.getCharacterList().subscribe({
       next:(response:StarWarsCharacter[])=>{
        this.charcterList = response
       
        setTimeout(()=>{
           this.isLoading = false;
        },1000)
        this.updatePagedData();
        // console.log(this.charcterList);
       }
       ,
       error: (err) => {
        console.error('Error fetching characters', err);
        this.isLoading = false;
      }
    })
  }

    onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCharacters = this.charcterList.slice(startIndex, endIndex);
  }

  handleCharacter(character:StarWarsCharacter){
       
    if(character){
      this.selectCharacter = character
    }
       
  }

  unSelectCharacter(value:any){
    this.selectCharacter = null
  }




}
