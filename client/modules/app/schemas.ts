import { schema } from 'normalizr';

export const user = new schema.Entity('users', undefined, {
  idAttribute: () => '0',
});
