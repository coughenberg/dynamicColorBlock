import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { gridFormReducer } from '../../store/grid-form/grid-form.reducer';
import { GridComponent } from './grid.component';
import { RippleElement } from './ripple-element/ripple-element.component';

@NgModule({
  declarations: [GridComponent, RippleElement],
  imports: [
    CommonModule,
    StoreModule.forFeature('gridFormData', gridFormReducer),
  ],
  exports: [GridComponent],
  providers: [],
  bootstrap: [],
})
export class GridModule {}
