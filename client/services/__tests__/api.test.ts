import mockAxios from 'jest-mock-axios';
import { schema } from 'normalizr';

import api, { serialzeRequestData } from '../api';

const model = new schema.Entity('models');

describe('services/api', () => {
  beforeEach(() => {
    localStorage.setItem(
      'ido.session',
      '{"authToken":"Bearer a1b2c3","expires":4839392,"authTime":4839388}'
    );
  });

  afterEach(() => {
    localStorage.clear();
    mockAxios.reset();
  });

  it('should use defaults', () => {
    api({
      url: '/test',
      method: 'get',
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'get',
        url: '/test',
        headers: {
          Authorization: expect.any(String),
        },
      })
    );
  });

  it('should not pass unsuppored properties to axios', () => {
    api({
      url: '/test',
      method: 'get',
      schemaProp: {}, // tslint:disable-line
      someBoolean: true, // tslint:disable-line
    });

    expect(mockAxios).not.toHaveBeenCalledWith(
      expect.objectContaining({
        schemaProp: {},
        someBoolean: true,
      })
    );
  });

  it('should throw an error if no url is provided', () => {
    expect(() => api()).toThrowError(); // tslint:disable-line
  });

  it('should take other request methods', () => {
    api({
      url: '/test',
      method: 'post',
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'post',
      })
    );
  });

  it('should take parameters', () => {
    const params = {
      value: 1,
      filter: 'recent',
    };

    api({
      url: '/test',
      method: 'get',
      params,
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        params,
      })
    );
  });

  // NOTE: jest-mock-axios doesn't run transformers, so let's assume it'll run and test the function itself
  it('should serialize request data', () => {
    expect(
      serialzeRequestData({
        id: 1,
        isBoolean: true,
      })
    ).toEqual({ id: 1, is_boolean: true });
    expect(serialzeRequestData('string')).toEqual('string');
  });

  it('should normalize the response', () => {
    const successFn = jest.fn();
    api({
      url: '/test',
      method: 'get',
    }).then(successFn);

    mockAxios.mockResponse({ data: { item: { id: 1, is_boolean: true } } });

    expect(successFn).toHaveBeenCalledWith({
      item: {
        id: 1,
        isBoolean: true,
      },
    });
  });

  it('should normalize any schemas', () => {
    const successFn = jest.fn();

    api({
      url: '/test',
      method: 'get',
      schema: { model },
    }).then(successFn);

    mockAxios.mockResponse({ data: { model: { id: 1, name: 'test' } } });

    expect(successFn).toHaveBeenCalledWith({
      entities: {
        models: {
          1: {
            id: 1,
            name: 'test',
          },
        },
      },
      result: {
        model: 1,
      },
    });
  });
  it('should throw an error if one is sent from the server', () => {
    const failFn = jest.fn();
    api({
      url: '/test',
      method: 'get',
    }).catch(failFn);

    mockAxios.mockError();

    expect(failFn).toHaveBeenCalled();
  });
});
