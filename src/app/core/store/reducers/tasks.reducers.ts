import { createReducer, on } from '@ngrx/store';
import {
  TasksPayload,
  updateIsLoadingTasks,
  updateTasks,
} from '../actions/tasks.actions';

export const initialState: TasksPayload = { isLoading: false, data: [] };

export const tasksReducer = createReducer(
  initialState,
  on(updateTasks, (state, { payload }) => ({ ...state, data: payload })),
  on(updateIsLoadingTasks, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }))
);
