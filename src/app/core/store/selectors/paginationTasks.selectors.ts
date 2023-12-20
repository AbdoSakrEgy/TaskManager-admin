import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPaginationTasksState =
  createFeatureSelector<any>('paginationTasks');

export const selectPaginationTasks = createSelector(
  selectPaginationTasksState,
  (state) => state
);
