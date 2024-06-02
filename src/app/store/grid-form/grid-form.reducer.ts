import { createReducer, on } from '@ngrx/store';
import { submitGridForm, gridFormSubmittedSuccess } from './grid-form.actions';

export interface GridForm {
  gridSize: number;
  baseColor: string;
  rippleColor: string;
}

export interface GridFormState {
  gridFormData: GridForm | null;
}

export const initialState: GridFormState = {
  gridFormData: {
    gridSize: 8,
    baseColor: 'blue',
    rippleColor: 'red',
  },
};

export const gridFormReducer = createReducer(
  initialState,
  on(submitGridForm, (state, { gridFormData }) => {
    console.warn(state, { gridFormData });
    return { ...state, gridFormData };
  }),
  on(gridFormSubmittedSuccess, (state, { gridFormData }) => ({
    ...state,
    gridFormData,
  }))
);
