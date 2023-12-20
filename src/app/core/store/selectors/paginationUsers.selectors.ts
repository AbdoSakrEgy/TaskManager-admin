import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUsersState = createFeatureSelector<any>('paginationUsers');

export const selectPaginationUsers = createSelector(selectUsersState, (state) => state);
