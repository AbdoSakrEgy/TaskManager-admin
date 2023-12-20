import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTasksState = createFeatureSelector<any>('tasks');

export const selectTasks = createSelector(selectTasksState, (state) => state);
