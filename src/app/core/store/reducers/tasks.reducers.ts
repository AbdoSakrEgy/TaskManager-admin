import { createReducer, on } from '@ngrx/store';
import { updateTasksList } from '../actions/tasks.actions';

export const initialState = [];

export const tasksReducer = createReducer(
  initialState,
  on(updateTasksList, (state, { data }) => data)
);
