import { createReducer, on } from '@ngrx/store';
import {
  UsersPayload,
  updateIsLoadingUsers,
  updateUsers,
} from '../actions/users.actions';

export const initialState: UsersPayload = { isLoading: false, data: [] };

export const usersReducer = createReducer(
  initialState,
  on(updateUsers, (state, { payload }) => ({ ...state, data: payload })),
  on(updateIsLoadingUsers, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }))
);
