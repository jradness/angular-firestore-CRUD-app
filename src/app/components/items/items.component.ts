import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  itemToEdit: Item;
  editState = false;
  progress = 0;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.updateProgress();
    });
  }

  updateProgress = () => {
    const meter = this.items.length;
    const arr = [];
    for (let x = 0; x <= meter - 1; x++) {
      const complete = this.items[x].complete;
      if (complete === true) {
        arr.push(this.items[x]);
      }
      let percent = Math.min((arr.length / meter), 1);
      percent = percent * 100;
      if (percent <= 100) {
        this.progress = percent;
        percent++;
      }
    }
  }

  editItem = (event, item: Item) => {
    this.editState = !this.editState;
    this.itemToEdit = item;
  };

  markComplete(item: Item) {
    item.complete = !item.complete;
    this.updateItem(item);
    this.updateProgress();
  }

  updateItem = (item: Item) => {
    this.itemService.updateItem(item);
    this.clearState();
  };

  clearState = () => {
    this.editState = false;
    this.itemToEdit = null;
  };

  deleteItem = (event, item) => {
    this.itemService.delete(item);
  };
}
