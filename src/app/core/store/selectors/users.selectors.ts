import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUsersState = createFeatureSelector<any>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.data
);
export const selectIsLoadingUsers = createSelector(
  selectUsersState,
  (state) => state.isLoading
);
