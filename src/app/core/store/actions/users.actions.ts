import { createAction, props } from '@ngrx/store';

export const updateUsers = createAction(
  '[Users] update users',
  props<{ data: any }>()
);
