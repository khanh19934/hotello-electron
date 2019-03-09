import React from 'react'
import { mapper, stateProps, withState } from 'recompose'

const withStateSafe = <TOutter, TState, TStateName extends string, TStateUpdaterName extends string>(
  stateName: TStateName,
  stateUpdaterName: TStateUpdaterName,
  initialState: TState | mapper<TOutter, TState>
) => <P extends stateProps<TState, TStateName, TStateUpdaterName>>(Component: React.ComponentType<P>) => {
  class ComponentWithStateSafe extends React.Component<P> {
    public mounted: boolean = false

    public componentWillMount() {
      this.mounted = true
    }

    public componentWillUnmount() {
      this.mounted = false
    }

    public setStateCreator = setStateFn => (...args) => {
      if (this.mounted) return setStateFn(...args)
    }

    public render() {
      const newProps = {
        [stateUpdaterName]: this.setStateCreator(this.props[String(stateUpdaterName)])
      }

      return <Component {...this.props} {...newProps} />
    }
  }

  return withState(stateName, stateUpdaterName, initialState)(ComponentWithStateSafe)
}

export default withStateSafe
