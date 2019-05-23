declare module 'jest-mock-axios' {
  namespace AxiosApi {
    export function mockResponse(args: any): any;
    export function mockError(args?: any): any;
    export function lastPromiseGet(args: any): any;
    export function popPromise(args: any): any;
    export function lastReqGet(args: any): any;
    export function popRequest(args: any): any;
    export function reset(): void;
  }

  export default AxiosApi;
}
