import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-generic-nested-dropdown',
  templateUrl: './generic-nested-dropdown.component.html',
  styleUrls: ['./generic-nested-dropdown.component.css'],
})
export class GenericNestedDropdownComponent {

  @Input() menuData!:any;
  @Input() mode!:string;
  @Input()selectedItem!:string;

  @Output() onItemClick = new EventEmitter();


  selectItem($event: any) {
    this.selectedItem = $event.acname;
    this.onItemClick.emit($event);
  }
}
