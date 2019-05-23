declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  __SESSION__: object;
  __DEV__: boolean;
  __PROD__: boolean;
}

declare var VERSION: string;

declare type Styles =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link';

declare type FetchStatus = 'loading' | 'loaded' | 'failed' | 'idle' | null;
