import { samples } from './schemas';
import { createRequestActionTypes } from 'util/actions';

export const LOAD_SAMPLES = 'datasets/samples/get';
export const SAMPLES = createRequestActionTypes('SAMPLES');

export const fetchSamples = (projectId, datasetId) => ({
  type: LOAD_SAMPLES,
  meta: {
    datasetId,
    projectId,
  },
  payload: {
    url: `projects/${projectId}/datasets/${datasetId}/samples`,
    types: SAMPLES,
  }
});
