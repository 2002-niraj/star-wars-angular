import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CharcterlistComponent } from './components/charcterlist/charcterlist.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent,CharcterlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 searchText: string = '';


}
