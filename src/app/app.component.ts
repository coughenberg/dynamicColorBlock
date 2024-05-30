import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './block-shape/grid.component';
import { SidebarModule } from './sidebar/sidebar.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridComponent, RouterOutlet, SidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamicColorBlock';
}
