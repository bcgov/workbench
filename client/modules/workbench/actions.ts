import { createRequestActionTypes } from 'util/actions';

export const FETCH_NOTEBOOKS = 'notebooks/get';
export const NOTEBOOKS = createRequestActionTypes('NOTEBOOKS');

export const fetchNotebooks = (projectId) => ({
  type: FETCH_NOTEBOOKS,
  payload: {
    url: `challenges/${projectId}`,
    params: {
      type: 'directory',
    },
    types: NOTEBOOKS,
  },
});
