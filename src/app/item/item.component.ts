import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SaveService} from '../save.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: string;
  @Output() took = new EventEmitter();

  constructor(private ss: SaveService) {}

  take() {
    this.ss.take(this.item);
    this.took.emit(this.item);
  }

}
