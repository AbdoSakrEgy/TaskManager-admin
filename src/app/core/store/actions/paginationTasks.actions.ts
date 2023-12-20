import { createAction, props } from '@ngrx/store';

export const updatePaginationTasksData = createAction(
  '[Paginationtasks] update data',
  props<{ data: any }>()
);
