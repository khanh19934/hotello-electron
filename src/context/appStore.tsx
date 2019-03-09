import { mergeAll } from 'ramda';
import { ComponentType } from 'react';
import createStore from 'react-waterfall';
import { ComponentEnhancer } from 'recompose';

import appState, { IAppState, IAppActions } from './app/app.context';

const config = {
  initialState: mergeAll([appState.initialState]),
  actionsCreators: mergeAll([appState.actionsCreators])
};

type TConnectFunction = <TNewProps, TOutter>(
  mapFunction: (state: StateType) => TNewProps // TODO: connect with props
) => ComponentEnhancer<TOutter & TNewProps, TOutter>;

export type StateType = IAppState;
// &
//   ICategoryState &
//   IShoppingCartState &
//   IProfileState &
//   IRegisterNewStoreState

type Actions = IAppActions;
// &
//   IProfileActions &
//   ICategoryActions &
//   IShoppingCartActions &
//   IRegisterNewStoreActions

interface IStore {
  Provider: ComponentType<{}>;
  connect: TConnectFunction;
  actions: Actions;
  subscribe(
    subscription: (action: Actions, state: Partial<StateType>, args: {}) => void
  ): void;
  unsubscribe(
    subscription: (action: Actions, state: Partial<StateType>, args: {}) => void
  ): void;
}

export const { Provider, connect, actions, subscribe, unsubscribe } = createStore(
  config
) as IStore;
