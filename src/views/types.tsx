export interface IInitialState {
  isFetching: boolean;
  data: any;
  errorMessage: null | string | any;
  message: null | string | any;
}

export interface IAction {
  payload: string | object | any[];
  errorMessage: string;
}
