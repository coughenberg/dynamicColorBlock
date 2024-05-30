import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('drawer')
  drawer!: MatDrawer;

  open = false;

  toggleSidebar() {
    this.drawer.toggle();
    this.open = !this.open;
  }
}
