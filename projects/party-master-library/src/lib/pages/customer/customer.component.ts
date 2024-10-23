import { Component } from '@angular/core';

@Component({
  selector: 'lib-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  showPopup = false;
  showCustomizeColumnsPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  // Method to open the popup
  openCustomizeColumnsPopup() {
    this.showCustomizeColumnsPopup = true;
  }

  // Method to close the popup
  closeCustomizeColumnsPopup() {
    this.showCustomizeColumnsPopup = false;
  }

  // Method to handle save action
  saveChanges() {
    console.log('Popup Save clicked!');
    this.closeCustomizeColumnsPopup(); // Close the popup after saving
  }
}
