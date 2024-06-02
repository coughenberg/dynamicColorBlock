import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { GridModule } from './components/block-shape/grid.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarModule,
    GridModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamicColorBlock';
}
