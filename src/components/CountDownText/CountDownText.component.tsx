import { Typography } from '@material-ui/core'
import * as React from 'react'
import 'typeface-open-sans'

interface IProps {
  start: number
  onFinish(): void
}

interface IState {
  start: number
}

export default class CountDownText extends React.Component<IProps, IState> {
  private timer?: NodeJS.Timer = undefined

  constructor(props) {
    super(props)
    this.state = {
      start: props.start
    }
  }

  public componentDidMount() {
    this.countDown()
  }

  public componentWillUnmount() {
    this.clearTimer()
  }

  public componentWillMount() {
    this.clearTimer()
  }

  private countDown = () => {
    this.timer = setInterval(() => {
      if (this.state.start > 1) {
        this.setState(state => ({ start: state.start - 1 }))

        return
      }

      this.clearTimer()
      this.props.onFinish()
    }, 1000)
  }

  private clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  public render() {
    return <Typography gutterBottom={true}> ({this.state.start})</Typography>
  }
}
