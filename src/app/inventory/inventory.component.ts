import { Component, OnInit } from '@angular/core';
import {SaveService} from '../save.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: string[];

  constructor(private ss: SaveService) {
    ss.inventory.subscribe(inventory => {
      this.inventory = inventory;
    });
  }

  ngOnInit() {
    this.ss.inventory.subscribe((inv) => {
      this.inventory = inv;
    });
  }

}
