import * as session from '../session';

const sessionPayload = {
  accessToken: '123',
  expires: 4839392,
  authTime: 4839388,
};
const sessionValue =
  '{"accessToken":"123","expires":4839392,"authTime":4839388}';

describe('services/session', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get a session', () => {
    session.saveSession(sessionPayload);
    expect(session.getSession()).toEqual(sessionPayload);
  });

  it('should return null if there is no session', () => {
    expect(session.getSession()).toBeNull();
  });

  it('should save a session', () => {
    session.saveSession(sessionPayload);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      session.SESSION_KEY,
      sessionValue
    );
    expect(localStorage.__STORE__[session.SESSION_KEY]).toEqual(sessionValue);
  });

  it('should destroy a session', () => {
    localStorage.setItem(session.SESSION_KEY, sessionValue);
    session.destroySession();
    expect(localStorage.__STORE__[session.SESSION_KEY]).not.toBeDefined();
  });

  it('should retreive a token', () => {
    session.saveSession(sessionPayload);
    expect(session.getToken()).toEqual(`Bearer ${sessionPayload.accessToken}`);
  });

  it('should throw an error if no token is found', () => {
    expect(session.getToken).toThrowError();
  });

  it('should retreive previous auth time', () => {
    session.saveSession(sessionPayload);
    expect(session.getAuthTime()).toEqual(sessionPayload.authTime);
  });

  it('should throw an error if there is no previous auth time', () => {
    expect(session.getAuthTime()).toEqual(0);
  });
});
