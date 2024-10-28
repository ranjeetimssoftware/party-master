import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-generic-nested-dropdown',
  templateUrl: './generic-nested-dropdown.component.html',
  styleUrls: ['./generic-nested-dropdown.component.css'],
})
export class GenericNestedDropdownComponent {
  selectedItem: string | null = null;

  menuData = [
    { label: 'Fixed Assets' },
    {
      label: 'Current Assets',
      children: [
        {
          label: 'Cash & Bank',
          children: [{ label: 'Cash' }, { label: 'Bank' }],
        },
        {
          label: 'Bills Receiveable',
          children: [{ label: 'Bills' }, { label: 'Receive' }],
        },
      ],
    },
  ];

  selectItem(label: string) {
    this.selectedItem = label;
  }
}
