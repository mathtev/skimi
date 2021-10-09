interface AppError {
  message: string;
  type: string;
}

export interface IAppState {
  loading: boolean;
  error: AppError | null;
}

export type AppStateReducerActionType = 'displayLoader' | 'displayError';

export interface AppStateReducerAction {
  payload: any;
  type: AppStateReducerActionType;
}

export const initialAppState: IAppState = {
  loading: false,
  error: null,
};

export function appStateReducer(
  prevState: IAppState,
  action: AppStateReducerAction
): IAppState {
  switch (action.type) {
    case 'displayLoader':
      return {
        ...prevState,
        loading: action.payload,
      };
    case 'displayError':
      return {
        ...prevState,
        error: action.payload,
      };

    default:
      return prevState;
  }
}
