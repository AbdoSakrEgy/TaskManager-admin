import { createReducer, on } from '@ngrx/store';
import { updateUsers } from '../actions/users.actions';

export const initialState = [];

export const usersReducer = createReducer(
  initialState,
  on(updateUsers, (state, { data }) => data)
);
