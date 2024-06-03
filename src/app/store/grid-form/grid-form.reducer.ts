import { createReducer, on } from '@ngrx/store';
import { submitGridForm, gridFormSubmittedSuccess } from './grid-form.actions';
import { GridForm } from '../../models/grid-form.model';

export interface GridFormState {
  gridFormData: GridForm | null;
}

export const initialState: GridFormState = {
  gridFormData: {
    gridHeight: 8,
    gridWidth: 8,
    baseColor: 'lightcyan',
    rippleColor: 'lightseagreen',
    rippleSpeed: 75,
    hasBorder: false,
  },
};

export const gridFormReducer = createReducer(
  initialState,
  on(submitGridForm, (state, { gridFormData }) => ({ ...state, gridFormData })),
  on(gridFormSubmittedSuccess, (state, { gridFormData }) => ({
    ...state,
    gridFormData,
  }))
);
