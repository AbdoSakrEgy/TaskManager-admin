import { createAction, props } from '@ngrx/store';

export const updateTasksList = createAction(
  '[Tasks] update task data list',
  props<{ data: any }>()
);
