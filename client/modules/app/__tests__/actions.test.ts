import * as actions from '../actions';

const user = {
  sub: '56d7cd26-dcd9-4ea0-8618-d2f2221f4429',
  name: 'Oscar Grouch',
  preferredUsername: 'oscar',
  givenName: 'Oscar',
  familyName: 'Grouch',
  email: 'oscar@sesamestreet.com',
};

describe('app/actions', () => {
  it('should configure fetchUser actions', () => {
    expect(actions.fetchUser()).toEqual({
      type: 'user/get',
    });
    expect(actions.fetchUserAsync.request()).toEqual({
      type: 'user/get/requested',
    });
    expect(actions.fetchUserAsync.success(user)).toEqual({
      type: 'user/get/success',
      payload: user,
    });
    expect(actions.fetchUserAsync.failure(Error('failed'))).toEqual({
      type: 'user/get/failed',
      payload: Error('failed'),
    });
  });
});
