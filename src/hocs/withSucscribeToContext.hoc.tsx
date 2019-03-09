import { has, merge, reduce } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import * as React from 'react';
import { connect, StateType, subscribe, unsubscribe } from '../context/appStore';

interface IWatchState<P> {
  watch: keyof StateType;
  mapProps(state: Partial<StateType>): Partial<P>;
}

type TMapFunction<TNewProps> = (state: StateType) => TNewProps;

const withSubscribeToContextHOC = <TNewProps, TOutter>(
  mapFunction: TMapFunction<TNewProps>,
  // tslint:disable-next-line:prefer-array-literal
  watchStates: Array<IWatchState<TNewProps>>
) => (Component: React.ComponentType<TOutter & TNewProps>) => {
  class ComponentWithSubscribe extends React.Component<
    TOutter & TNewProps,
    TNewProps | {}
  > {
    constructor(props) {
      super(props);
      this.state = {};
    }

    private subscriber = (_, contextState: Partial<StateType>) => {
      const newState = reduce((acc: {}, k: IWatchState<TNewProps>) => {
        if (!has(k.watch)(contextState)) {
          return acc;
        }
        const additions = k.mapProps(contextState);
        if (isNilOrEmpty(additions)) {
          return acc;
        }

        return merge(acc, additions);
      }, {})(watchStates);

      if (isNilOrEmpty(newState)) {
        return;
      }
      this.setState(newState);
    };

    public componentDidMount() {
      subscribe(this.subscriber);
    }

    public componentWillUnmount() {
      unsubscribe(this.subscriber);
    }

    public render() {
      return <Component {...this.props} {...this.state} />;
    }
  }

  return connect<TNewProps, TOutter>(mapFunction)(ComponentWithSubscribe);
};

export default withSubscribeToContextHOC;
