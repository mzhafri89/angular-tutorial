import { createAction, props } from '@ngrx/store';
import FirebaseUser from 'src/app/core/models/firebase-user.model';
import User from 'src/app/core/models/user.model';

interface Payload<T> {
  payload: T;
}

export const register = createAction('[Auth] Register', props<Payload<User>>());

export const authenticated = createAction(
  '[Auth] Authenticated',
  props<Payload<FirebaseUser>>()
);
