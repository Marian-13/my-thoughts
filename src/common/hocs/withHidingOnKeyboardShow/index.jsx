import React from 'react'
import { connect } from 'react-redux'

const withHidingOnKeyboardShow = WrappedComponent => {
  const mapStateToProps = state => ({ isKeyboardShown: state.keyboard.isShown })

  const HOC = props => {
    const { isKeyboardShown, ...rest } = props
    const style = isKeyboardShown ? { display: 'none' } : {}

    return <WrappedComponent {...rest} style={style} />
  }

  return connect(mapStateToProps, {})(HOC)
}

export default withHidingOnKeyboardShow
