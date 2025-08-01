import { StarWarsCharacter } from './../../interface/character.model';
import { Component, inject} from '@angular/core';
import { CharacterlistService } from '../../services/characterlist.service';
import { CharactercardComponent } from './charactercard/charactercard.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { debounceTime } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-charcterlist',
  standalone:true,
  imports: [CharactercardComponent,MatPaginatorModule,MatProgressSpinnerModule,CharacterDetailsComponent],
  templateUrl: './charcterlist.component.html',
  styleUrl: './charcterlist.component.css'
})
export class CharcterlistComponent {

  charcterList:StarWarsCharacter[]=[]
  filteredList: StarWarsCharacter[] = [];
  allDetails:any;
  searchText:string = '';
  selectCharacter:StarWarsCharacter |null = null

  isLoading = true;

  totalItems = 0;
  pageSize = 8;
  currentPage = 0;
  pagedCharacters: StarWarsCharacter[] = [];

  private characterlist = inject(CharacterlistService);
 private searchService = inject(SearchService)
  

  ngOnInit(): void {

    this.isLoading = true
    this.characterlist.getCharacterList().subscribe({
       next:(response:StarWarsCharacter[])=>{
        this.charcterList = response
        this.filteredList = [...this.charcterList]
       
        setTimeout(()=>{
           this.isLoading = false;
        },1000)
        this.updatePagedData();
       
       }
       ,
       error: (err) => {
        console.error('Error fetching characters', err);
        this.isLoading = false;
      }
    })

    this.searchService.searchText.pipe(debounceTime(500)).subscribe((text)=>{
      this.searchText = text
      this.applyFilter(text)
    })
  }

  applyFilter(text:string):void{
      
       if(!text.trim()){
        this.filteredList = [...this.charcterList]
       }
       else{
        this.filteredList = this.charcterList.filter((character)=> character.name.toLowerCase().includes(text.toLowerCase()));
       
       }
       
       this.currentPage = 0;
       this.updatePagedData();
  }

    onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  updatePagedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCharacters = this.filteredList.slice(startIndex, endIndex);
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
