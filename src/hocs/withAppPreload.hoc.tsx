import * as React from 'react'

interface IProps {
  dataPreLoad(): void
}

export default (Comp: React.ComponentType) =>
  class extends React.Component<IProps, {}> {
    public componentDidMount() {
      this.props.dataPreLoad()
    }
    public render() {
      return <Comp {...this.props} />
    }
  }
