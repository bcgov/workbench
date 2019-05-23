import { createAction, createAsyncAction } from 'typesafe-actions';
import { User } from './types';

export const fetchUser = createAction('user/get');

export const fetchUserAsync = createAsyncAction(
  'user/get/requested',
  'user/get/success',
  'user/get/failed'
)<void, User, Error>();

export const toggleSidebarVisibility = createAction('sidebar/toggle');
