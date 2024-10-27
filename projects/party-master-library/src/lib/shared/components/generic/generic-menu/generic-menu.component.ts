import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './generic-menu.component.html',
})
export class GenericMenuComponent {
  @Input() item: any;
}