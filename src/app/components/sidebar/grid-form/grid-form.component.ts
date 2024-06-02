import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  GridForm,
  GridFormState,
} from '../../../store/grid-form/grid-form.reducer';
import { submitGridForm } from '../../../store/grid-form/grid-form.actions';

@Component({
  selector: 'app-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.css',
})
export class GridFormComponent {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ form: GridFormState }>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      gridSize: [8, [Validators.min(0), Validators.max(100)]],
      baseColor: [''],
      rippleColor: [''],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.warn(this.formGroup.value);
      this.store.dispatch(
        submitGridForm({ gridFormData: this.formGroup.value })
      );
    }
  }
}
