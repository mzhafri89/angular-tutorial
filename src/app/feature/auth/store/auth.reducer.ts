import { createReducer, on } from '@ngrx/store';

import FirebaseUser from 'src/app/core/models/firebase-user.model';
import { authenticated } from './auth.actions';

const initialState: FirebaseUser = null;

const reducer = createReducer(
  initialState,
  on(authenticated, (_, action) => action.payload)
);

export default reducer;
