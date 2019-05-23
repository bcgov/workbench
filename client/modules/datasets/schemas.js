import { schema } from 'normalizr';
import uniqueId from 'lodash/uniqueId';

export const field = new schema.Entity('fields', {}, {
  idAttribute: 'name',
});
export const dataset = new schema.Entity('datasets');
export const sample = new schema.Entity('samples');
export const samples = {
  samples: [sample]
};

export default {
  dataset,
  samples,
};
