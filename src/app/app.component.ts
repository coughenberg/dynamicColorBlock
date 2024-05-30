import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LargeSquareComponent } from './block_shape/large-square.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LargeSquareComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamicColorBlock';
}
