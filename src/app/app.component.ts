import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { GridModule } from './components/block-shape/grid.module';
import { SpotifyConnectionModule } from './components/spotify-connection/spotify-connection.module';
import { provideHttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { gridFormReducer } from './store/grid-form/grid-form.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarModule, GridModule, SpotifyConnectionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dynamicColorBlock';
}
