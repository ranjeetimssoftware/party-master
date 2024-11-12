import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-generic-nested-dropdown',
  templateUrl: './generic-nested-dropdown.component.html',
  styleUrls: ['./generic-nested-dropdown.component.css'],
})
export class GenericNestedDropdownComponent {
  selectedItem: string | null = null;

  @Input() menuData!:any;

  @Output() onItemClick = new EventEmitter();


  selectItem($event: any) {
    this.selectedItem = $event.accode;
    this.onItemClick.emit($event);
  }
}
