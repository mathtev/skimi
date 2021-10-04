interface AppError {
  message: string;
  type: string;
}

export interface IAppState {
  nativeLanguage: string;
  learningLanguage: string;
  loading: boolean;
  error: AppError | null;
}

export type AppStateReducerActionType =
  | 'setLearningLanguage'
  | 'displayLoader'
  | 'displayError';

export interface AppStateReducerAction {
  payload: any;
  type: AppStateReducerActionType;
}

export const initialAppState: IAppState = {
  nativeLanguage: 'english',
  learningLanguage: 'german',
  loading: false,
  error: null,
};

export function appStateReducer(
  prevState: IAppState,
  action: AppStateReducerAction
): IAppState {
  switch (action.type) {
    case 'setLearningLanguage':
      return {
        ...prevState,
        learningLanguage: action.payload,
      };
    case 'displayLoader':
      return {
        ...prevState,
        learningLanguage: action.payload,
      };

    default:
      return prevState;
  }
}
