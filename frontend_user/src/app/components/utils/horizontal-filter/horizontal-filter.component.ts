import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { IonChip, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-horizontal-filter',
  templateUrl: './horizontal-filter.component.html',
  styleUrls: ['./horizontal-filter.component.scss'],
  imports: [CommonModule, IonChip, IonIcon, IonLabel],
})
export class HorizontalFilterComponent implements OnInit {
  @Input() public listItems: any[] = [];
  @Output() public filteredItems = new EventEmitter<any[]>();
  public selectedItems: any[] = [];

  constructor() {
    addIcons({
      close,
    });
  }

  ngOnInit() {}

  ////////////////////////  Filters ///////////////////////////////////
  toggleItem(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      // Remove
      this.selectedItems = [
        ...this.selectedItems.slice(0, index),
        ...this.selectedItems.slice(index + 1),
      ];
    } else {
      // Add
      this.selectedItems = [...this.selectedItems, item];
    }
    this.filteredItems.emit(this.selectedItems); // Emit to parent
  }

  public isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  public clearFilters() {
    this.selectedItems = [];
    this.filteredItems.emit(this.selectedItems); // Emit to parent
  }
}
