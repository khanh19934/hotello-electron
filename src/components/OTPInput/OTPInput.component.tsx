import React, { Component, PureComponent } from 'react'

// keyCode constants
const BACKSPACE = 8
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DELETE = 46

interface IProps {
  numInputs: number
  onChange(s?: any): void
  separator?: object
  containerStyle?: object
  inputStyle?: object
  focusStyle?: object
  isDisabled?: boolean
  disabledStyle?: object
  hasErrored?: boolean
  errorStyle?: object
  shouldAutoFocus?: boolean
  isInputNum?: boolean
}

interface IState {
  activeInput: number
  otp: string[]
}

// Doesn't really check if it's a style Object
// Basic implemenetation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
const isStyleObject = obj => typeof obj === 'object'

class SingleOtpInput extends PureComponent<any> {
  // @ts-ignore
  public input: any

  // Focus on first render
  // Only when shouldAutoFocus is true
  public componentDidMount() {
    if (this.input && this.props.focus && this.props.shouldAutoFocus) {
      this.input.focus()
    }
  }

  public componentDidUpdate(prevProps) {
    // Check if focusedInput changed
    // Prevent calling function if input already in focus
    if (prevProps.focus !== this.props.focus && (this.input && this.props.focus)) {
      this.input.focus()
      this.input.select()
    }
  }

  public getClasses = (...classes) => classes.filter(c => !isStyleObject(c) && c !== false).join(' ')

  public render() {
    const {
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      shouldAutoFocus,
      isInputNum,
      value,
      ...rest
    } = this.props

    const numValueLimits = isInputNum ? { min: 0, max: 9 } : {}

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={Object.assign(
            { width: '1em', textAlign: 'center' },
            inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle
          )}
          className={this.getClasses(focus && focusStyle, isDisabled && disabledStyle, hasErrored && errorStyle)}
          {...numValueLimits}
          maxLength={1}
          ref={input => {
            this.input = input
          }}
          disabled={isDisabled}
          value={value ? value : ''}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    )
  }
}

// tslint:disable-next-line:max-classes-per-file
class OtpInput extends Component<IProps, IState> {
  public state = {
    activeInput: 0,
    otp: []
  }

  // Helper to return OTP from input
  public getOtp = () => {
    this.props.onChange(this.state.otp.join(''))
  }

  // Focus on input by index
  public focusInput = (input: number) => {
    const { numInputs } = this.props
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0)

    this.setState({
      activeInput
    })
  }

  // Focus on next input
  public focusNextInput = () => {
    const { activeInput } = this.state

    this.focusInput(activeInput + 1)
  }

  // Focus on previous input
  public focusPrevInput = () => {
    const { activeInput } = this.state

    this.focusInput(activeInput - 1)
  }

  // Change OTP value at focused input
  public changeCodeAtFocus = (value: string) => {
    const { activeInput, otp } = this.state
    // @ts-ignore

    otp[activeInput] = value

    this.setState({
      otp
    })
    this.getOtp()
  }

  // Handle pasted OTP
  public handleOnPaste = (e: any) => {
    e.preventDefault()
    const { numInputs } = this.props
    const { activeInput, otp } = this.state

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('')

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        // @ts-ignore
        otp[pos] = pastedData.shift()
      }
    }

    this.setState({
      otp
    })

    this.getOtp()
  }

  public handleOnChange = (e: any) => {
    this.changeCodeAtFocus(e.target.value)
    this.focusNextInput()
  }

  // Handle cases of backspace, delete, left arrow, right arrow
  public handleOnKeyDown = (e: any) => {
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault()
        this.changeCodeAtFocus('')
        this.focusPrevInput()
        break
      case DELETE:
        e.preventDefault()
        this.changeCodeAtFocus('')
        break
      case LEFT_ARROW:
        e.preventDefault()
        this.focusPrevInput()
        break
      case RIGHT_ARROW:
        e.preventDefault()
        this.focusNextInput()
        break
      default:
        break
    }
  }

  public renderInputs = () => {
    const { activeInput, otp } = this.state
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle,
      shouldAutoFocus,
      isInputNum
    } = this.props
    const inputs = []

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        // @ts-ignore
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onPaste={this.handleOnPaste}
          onFocus={e => {
            this.setState({
              activeInput: i
            })
            e.target.select()
          }}
          onBlur={() => this.setState({ activeInput: -1 })}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={isInputNum}
        />
      )
    }

    return inputs
  }

  public render() {
    const { containerStyle } = this.props

    return (
      <div
        style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)}
        className={!isStyleObject(containerStyle) && (containerStyle as any)}
      >
        {this.renderInputs()}
      </div>
    )
  }
}

export default OtpInput
