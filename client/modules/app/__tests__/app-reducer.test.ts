import reducer from '../reducer';
import * as actions from '../actions';

import { User } from '../types';

const user: User = {
  sub: '56d7cd26-dcd9-4ea0-8618-d2f2221f4429',
  name: 'Oscar Grouch',
  preferredUsername: 'oscar',
  givenName: 'Oscar',
  familyName: 'Grouch',
  email: 'oscar@sesamestreet.com',
};

describe('app/reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      version: '1.0.0',
      user: {},
      isSidebarOpen: true,
      fetchStatus: 'idle',
    });
  });

  it('handles async request', () => {
    expect(reducer(undefined, actions.fetchUserAsync.request())).toEqual({
      version: '1.0.0',
      user: {},
      isSidebarOpen: true,
      fetchStatus: 'loading',
    });
  });

  it('handles async success', () => {
    expect(reducer(undefined, actions.fetchUserAsync.success(user))).toEqual({
      version: '1.0.0',
      user,
      isSidebarOpen: true,
      fetchStatus: 'loaded',
    });
  });

  it('handles async failure', () => {
    expect(
      reducer(undefined, actions.fetchUserAsync.failure(Error(' failed')))
    ).toEqual({
      version: '1.0.0',
      user: {},
      isSidebarOpen: true,
      fetchStatus: 'failed',
    });
  });

  it('toggles sidebar visibility', () => {
    const firstState = reducer(undefined, actions.toggleSidebarVisibility());
    expect(firstState).toEqual({
      version: '1.0.0',
      user: {},
      isSidebarOpen: false,
      fetchStatus: 'idle',
    });
    expect(reducer(firstState, actions.toggleSidebarVisibility())).toEqual({
      version: '1.0.0',
      user: {},
      isSidebarOpen: true,
      fetchStatus: 'idle',
    });
  });
});
