import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchText :string = '';

  private searchService = inject(SearchService)
  
 
  ngOnInit(): void {
      
    // this.searchService.searchText.pipe(debounceTime(500)).subscribe((text)=>{
    //   console.log(text);
    // })
    
  }

  onSearchChange(value:string){
    
     this.searchService.updateSearchText(value);
  }
  

}
