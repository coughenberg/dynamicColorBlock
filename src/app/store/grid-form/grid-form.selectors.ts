import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GridFormState } from './grid-form.reducer';

export const selectGridFormState =
  createFeatureSelector<GridFormState>('gridFormData');

export const selectGridFormData = createSelector(
  selectGridFormState,
  (state: GridFormState) => state?.gridFormData
);
