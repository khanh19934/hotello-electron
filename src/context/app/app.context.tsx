export default {
  initialState: {
    loading: false,
    skippingLogIn: false,
    skippingOnboard: false,
    finishedTutorial: false,
    appSettings: {},
    accessToken: ''
  } as IAppState,
  actionsCreators: {}
};

export interface IAppState {
  loading: boolean;
  skippingLogIn: boolean;
  skippingOnboard: boolean;
  finishedTutorial: boolean;
  accessToken: string;
}

export interface IAppActions {}
