import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

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

  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  openDropdown() {
    this.dropdownMenu.nativeElement.classList.add('show');
  }

  closeDropdown() {
    this.dropdownMenu.nativeElement.classList.remove('show');
  }


  selectItem($event: any) {
    this.selectedItem = $event.acname;
    this.onItemClick.emit($event);
  }
}
