import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css']
})
export class NavTreeComponent {
  isNavbarOpen = true;
  secondSidebarVisible = false;
  thirdSidebarVisible = false;
  fourthSidebarVisible = false;

  selectedMainItem: string | null = null;
  selectedSecondItem: string | null = null;
  selectedThirdItem: string | null = null;
  MainItems= ['A', 'B', 'C', 'D', 'E'];
  GroupAItems = ['A1', 'B1', 'C1', 'D1', 'E1'];
  GroupBItems = ['A11', 'A12', 'A13', 'A14', 'A15'];
  GroupCItems = ['A111', 'A112', 'A113', 'A114', 'A115'];
  filteredMainItems: string[] = [...this.MainItems]; // Default to all items
  filteredGroupAItems = [...this.GroupAItems];
  filteredGroupBItems = [...this.GroupBItems];
  filteredGroupCItems = [...this.GroupCItems];
  searchQuery: string = '';
  searchTermSecond: string = '';
  searchTermThird: string = '';
  searchTermFourth: string = '';

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;

    // Reset active states when the dashboard is closed
    if (!this.isNavbarOpen) {
      this.resetActiveStates();
    }
  }

  toggleSecondSidebar(item: string) {
    this.secondSidebarVisible = true;
    this.thirdSidebarVisible = false;
    this.fourthSidebarVisible = false;

    // Update selected state for the main sidebar
    this.selectedMainItem = item;

    // Reset lower-level selections
    this.selectedSecondItem = null;
    this.selectedThirdItem = null;
  }

  toggleThirdSidebar(item: string) {
    this.thirdSidebarVisible = true;
    this.fourthSidebarVisible = false;

    // Update selected state for the second sidebar
    this.selectedSecondItem = item;

    // Reset lower-level selections
    this.selectedThirdItem = null;
  }

  toggleFourthSidebar(item: string) {
    this.fourthSidebarVisible = true;

    // Update selected state for the third sidebar
    this.selectedThirdItem = item;
  }

  resetActiveStates() {
    // Reset all selected items and visibility flags
    this.selectedMainItem = null;
    this.selectedSecondItem = null;
    this.selectedThirdItem = null;
    this.secondSidebarVisible = false;
    this.thirdSidebarVisible = false;
    this.fourthSidebarVisible = false;
  }

  filterItems(sidebar: string) {
    if (sidebar === 'main') {
      this.filteredGroupAItems = this.GroupAItems.filter(item => item.toLowerCase().includes(this.searchTermSecond.toLowerCase()));
    } else if (sidebar === 'GroupA') {
      this.filteredGroupAItems = this.GroupAItems.filter(item => item.toLowerCase().includes(this.searchTermSecond.toLowerCase()));
    } else if (sidebar === 'GroupB') {
      this.filteredGroupBItems = this.GroupBItems.filter(item => item.toLowerCase().includes(this.searchTermThird.toLowerCase()));
    } else if (sidebar === 'GroupC') {
      this.filteredGroupCItems = this.GroupCItems.filter(item => item.toLowerCase().includes(this.searchTermFourth.toLowerCase()));
    }
  }
}

