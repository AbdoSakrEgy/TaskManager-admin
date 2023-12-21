import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTasksState = createFeatureSelector<any>('tasks');

export const selectTasks = createSelector(
  selectTasksState,
  (state) => state.data
);
export const selectIsLoadingTasks = createSelector(
  selectTasksState,
  (state) => state.isLoading
);
