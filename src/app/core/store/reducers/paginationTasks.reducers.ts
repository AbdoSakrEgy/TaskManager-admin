import { createReducer, on } from '@ngrx/store';
import { updatePaginationTasksData } from '../actions/paginationTasks.actions';

export const initialState = {
  tasks: [],
  tasksPerPage: 4,
  selectedPage: 1,
  pageNumbers: [0],
  activePageNumber: 1,
};

export const paginationTasksReducer = createReducer(
  initialState,
  on(updatePaginationTasksData, (state, { data }) => data)
);
