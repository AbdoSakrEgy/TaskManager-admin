import { createAction, props } from '@ngrx/store';

export const updatePaginationUsersInfo = createAction(
  '[Pagination Users] update data',
  props<{ data: any }>()
);
