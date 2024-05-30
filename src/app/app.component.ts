import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './block-shape/grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamicColorBlock';
}
