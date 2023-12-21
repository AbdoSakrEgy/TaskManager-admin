import { createAction, props } from '@ngrx/store';

export interface TasksPayload {
  isLoading: boolean;
  data: any[];
}

export const updateTasks = createAction(
  '[Tasks] update tasks',
  props<{ payload: any[] }>()
);
export const updateIsLoadingTasks = createAction(
  '[Tasks] update is loading tasks',
  props<{ payload: boolean }>()
);
