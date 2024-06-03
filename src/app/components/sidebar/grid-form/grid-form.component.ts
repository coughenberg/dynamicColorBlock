import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitGridForm } from '../../../store/grid-form/grid-form.actions';
import { GridFormState } from '../../../store/grid-form/grid-form.reducer';

@Component({
  selector: 'app-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.css',
})
export class GridFormComponent {
  static readonly DEFAULT_FORM = {
    gridHeight: new FormControl(8, { nonNullable: true }),
    gridWidth: new FormControl(8, { nonNullable: true }),
    baseColor: new FormControl('lightcyan', { nonNullable: true }),
    rippleColor: new FormControl('lightseagreen', { nonNullable: true }),
    rippleSpeed: new FormControl(75, { nonNullable: true }),
    hasBorder: new FormControl(false, { nonNullable: true }),
  };
  formGroup: FormGroup<{
    gridHeight: FormControl<number>;
    gridWidth: FormControl<number>;
    baseColor: FormControl<string>;
    rippleColor: FormControl<string>;
    rippleSpeed: FormControl<number>;
    hasBorder: FormControl<boolean>;
  }> = new FormGroup(GridFormComponent.DEFAULT_FORM);

  constructor(private store: Store<{ form: GridFormState }>) {}


  onSubmit(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(
        submitGridForm({
          gridFormData: {
            gridHeight: this.formGroup.controls.gridHeight.value,
            gridWidth: this.formGroup.controls.gridWidth.value,
            baseColor: this.formGroup.controls.baseColor.value,
            rippleColor: this.formGroup.controls.rippleColor.value,
            rippleSpeed: this.formGroup.controls.rippleSpeed.value,
            hasBorder: this.formGroup.controls.hasBorder.value,
          },
        })
      );
    }
  }
}
