import { createAction, props } from '@ngrx/store';

export interface UsersPayload {
  isLoading: boolean;
  data: any[];
}

export const updateUsers = createAction(
  '[Users] update users',
  props<{ payload: any[] }>()
);

export const updateIsLoadingUsers = createAction(
  '[Users] update is loading users',
  props<{ payload: boolean }>()
);
