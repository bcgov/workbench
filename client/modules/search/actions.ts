import { createAction, createAsyncAction } from 'typesafe-actions';

export const fetchSearch = createAction(
  'search/get',
  resolve => (term: string) => resolve(term)
);

export const fetchSearchAsync = createAsyncAction(
  'search/get/requested',
  'search/get/success',
  'search/get/failed'
)<void, Array<any>, Error>();
