import { createAction, props } from '@ngrx/store';

export const submitGridForm = createAction(
  '[Grid Form] Submit',
  props<{
    gridFormData: {
      gridSize: number;
      baseColor: string;
      rippleColor: string;
    };
  }>()
);

export const gridFormSubmittedSuccess = createAction(
  '[Grid Form] Submit Success',
  props<{
    gridFormData: {
      gridSize: number;
      baseColor: string;
      rippleColor: string;
    };
  }>()
);
