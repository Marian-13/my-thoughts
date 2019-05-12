import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-animated-css'

const withOneTimeInOutAnimation = WrappedComponent => {
  const HOC = class extends Component {
    static propTypes = {
      ...Animated.propTypes,
      hideAfterDuration: PropTypes.number
    }

    static defaultProps = {
      animationIn: 'fadeInDown',
      animationOut: 'fadeOut',
      animationInDuration: 1000,
      animationOutDuration: 1000,
      hideAfterDuration: 3000
    }

    state = { isVisible: true, hasAnimationCompleted: false }

    componentDidMount() {
      const { animationOutDuration, hideAfterDuration } = this.props

      setTimeout(() => {
        this.setState({ isVisible: false }, () => {
          setTimeout(() => this.setState({ hasAnimationCompleted: true }), animationOutDuration)
        })
      }, hideAfterDuration)
    }

    render() {
      const {
        animationIn,
        animationOut,
        animationInDuration,
        animationOutDuration,
        ...rest
      } = this.props

      const { isVisible, hasAnimationCompleted } = this.state

      if (hasAnimationCompleted) return null

      return (
        <Animated
          animationIn={animationIn}
          animationOut={animationOut}
          animationInDuration={animationInDuration}
          animationOutDuration={animationOutDuration}
          isVisible={isVisible}
        >
          <WrappedComponent {...rest} />
        </Animated>
      )
    }
  }

  return HOC
}

export default withOneTimeInOutAnimation
