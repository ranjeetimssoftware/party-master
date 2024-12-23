import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css']
})
export class NavTreeComponent implements OnInit {
  isCollapsed = true;
  activeSubNav: string | null = null; // Track the active sub-navbar

  constructor() { }

  ngOnInit(): void {}

  toggleNav() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Function to toggle the active sub-navbar
  toggleSubNav(menu: string) {
    // Toggle between showing and hiding the sub-navbar for the clicked menu
    if (this.activeSubNav === menu) {
      this.activeSubNav = null; // Hide sub-navbar if the same item is clicked again
    } else {
      this.activeSubNav = menu; // Show sub-navbar for the clicked item
    }
  }
}
