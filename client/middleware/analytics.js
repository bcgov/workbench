import get from 'lodash/get';
import { LOCATION_CHANGE } from 'react-router-redux';

const analyticsArray = get(window, '_paq');

function createMiddleware(tracking = []) {
  function trackEvent(category, action) {
    tracking.push(['trackEvent', category, action]);
  }
  tracking.push(['setUserId', __USER__.username]);

  return store => next => action => {
    if (action.type === LOCATION_CHANGE) {
      tracking.push(['trackPageView']);
    } else if (action.track) {
      const [type, ...actions] = action.type.split('/');
      trackEvent(type, actions.join('/'));
    }

    return next(action);
  };
}

export default createMiddleware(analyticsArray);
