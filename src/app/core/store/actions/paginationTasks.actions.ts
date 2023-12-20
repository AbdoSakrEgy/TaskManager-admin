import { createAction, props } from '@ngrx/store';

export const updatePaginationTasksData = createAction(
  '[Pagination Tasks] update data',
  props<{ data: any }>()
);
