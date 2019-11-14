import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {SaveService} from './save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'livrejeu';

  constructor(private ss: SaveService, private router: Router) {}

  begin() {
    this.ss.clear();
    this.router.navigate(['/page/', 0]);
  }

}
