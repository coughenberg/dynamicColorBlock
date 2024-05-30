import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface GridForm {
  gridSize: number;
  baseColor: string;
  rippleColor: string;
}

@Component({
  selector: 'app-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.css',
})
export class GridFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      gridSize: [8, [Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}
