const requestActions = ['REQUESTED', 'SUCCESS', 'FAILED'];

export const createRequestActionTypes = (type) => {
  return requestActions.reduce((prev, key) => {
    return {
      ...prev,
      [key]: [type, key].join('_'),
    };
  }, {});
};

export default {
  createRequestActionTypes,
};
