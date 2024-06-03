import { createAction, props } from '@ngrx/store';
import { GridForm } from '../../models/grid-form.model';

export const submitGridForm = createAction(
  '[Grid Form] Submit',
  props<{
    gridFormData: GridForm;
  }>()
);

export const gridFormSubmittedSuccess = createAction(
  '[Grid Form] Submit Success',
  props<{
    gridFormData: GridForm;
  }>()
);
