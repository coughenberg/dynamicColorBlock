import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar.component';
import { GridFormComponent } from './grid-form/grid-form.component';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';
import { gridFormReducer } from '../../store/grid-form/grid-form.reducer';

@NgModule({
  declarations: [
    SidebarComponent,
    GridFormComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    StoreModule.forRoot({ gridFormData: gridFormReducer }),
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SidebarComponent],
  providers: [],
  bootstrap: []
})
export class SidebarModule { }