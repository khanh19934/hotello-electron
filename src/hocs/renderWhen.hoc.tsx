import { ComponentType } from 'react'
import { branch, ComponentEnhancer, compose, renderComponent } from 'recompose'

interface IState<TWhenProps, TRenderProps> {
  when(props: TWhenProps): boolean
  render: ComponentType<TRenderProps>
}

interface IRenderWhenEnhancer {
  RenderWhen<TInner, TW1, TR1>(states: [IState<TW1, TR1>]): ComponentEnhancer<TInner, TInner & TW1 & TR1>
  RenderWhen<TInner, TW1, TR1, TW2, TR2>(
    states: [IState<TW1, TR1>, IState<TW2, TR2>]
  ): ComponentEnhancer<TInner, TInner & TW1 & TR1 & TW2 & TR2>
  RenderWhen<TInner, TW1, TR1, TW2, TR2, TW3, TR3>(
    states: [IState<TW1, TR1>, IState<TW2, TR2>, IState<TW3, TR3>]
  ): ComponentEnhancer<TInner, TInner & TW1 & TR1 & TW2 & TR2 & TW3 & TR3>
  RenderWhen<TInner, TW1, TR1, TW2, TR2, TW3, TR3, TW4, TR4>(
    states: [IState<TW1, TR1>, IState<TW2, TR2>, IState<TW3, TR3>, IState<TW4, TR4>]
  ): ComponentEnhancer<TInner, TInner & TW1 & TR1 & TW2 & TR2 & TW3 & TR3 & TW4 & TR4>
  // TODO: add more if necessary
}

const renderWhen: IRenderWhenEnhancer['RenderWhen'] = states =>
  compose(...states.map(state => branch(state.when, renderComponent(state.render))))

export default renderWhen
