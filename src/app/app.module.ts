import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LargeSquareComponent } from './block_shape/large-square.component';
import { SquareElement } from './block_shape/square_element/element-square.component';

@NgModule({
  declarations: [
    AppComponent,
    LargeSquareComponent,
    SquareElement
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
