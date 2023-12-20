import { createReducer, on } from '@ngrx/store';
import { updatePaginationUsersInfo } from '../actions/paginationUsers.actions';

export const initialState = {
  users: [],
  usersPerPage: 4,
  selectedPage: 1,
  pageNumbers: [1],
  activePageNumber: 1,
};

export const paginationUsersReducer = createReducer(
  initialState,
  on(updatePaginationUsersInfo, (state, { data }) => ({
    users: data.users,
    usersPerPage: data.usersPerPage,
    selectedPage: data.selectedPage,
    pageNumbers: data.pageNumbers,
    activePageNumber: data.activePageNumber,
  }))
);
