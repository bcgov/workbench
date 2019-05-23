import Fuse from 'fuse.js';

import { PROJECT } from 'modules/app/actions';
import { SAMPLES } from 'modules/datasets/actions';
import { SEARCH_DATASETS } from 'modules/search/actions';

function createSearchMiddleware() {
  const fuse = new Fuse([], {
    keys: ['description', 'name', 'title'],
  });

  return store => next => action => {
    if (action.type === PROJECT.SUCCESS) {
      const ids = Object.keys(action.payload.entities.datasets);
      const datasets = ids.map(id => action.payload.entities.datasets[id]);
      fuse.setCollection([...fuse.list, ...datasets]);

      next({
        type: SEARCH_DATASETS,
        payload: {
          ...action.payload,
          results: fuse.search(store.getState().search.term),
        },
      });
    } else if (action.type === SAMPLES.SUCCESS) {
      const { fields } = action.payload.meta;
      fuse.setCollection([...fuse.list, ...fields]);
    } else if (action.type === SEARCH_DATASETS) {
      return next({
        type: SEARCH_DATASETS,
        payload: {
          ...action.payload,
          results: fuse.search(action.payload.term),
        },
      });
    }

    return next(action);
  };
}

export default createSearchMiddleware;
