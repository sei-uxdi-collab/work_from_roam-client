import Icon from '@mdi/react'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { InputAdornment, withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './PasswordShowHide.scss'

class PasswordInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      passwordIsMasked: true,
    }
  }

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  togglePasswordMask = () => {
    this.setState({
      passwordIsMasked: !this.state.passwordIsMasked
    })
  };

  render () {
    const { passwordIsMasked } = this.state

    return (
      <TextField
        type={passwordIsMasked ? 'password' : 'text'}
        {...this.props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon
                path={passwordIsMasked ? mdiEyeOutline : mdiEyeOffOutline}
                className="eye"
                title="Hide" size={1}
                onClick={this.togglePasswordMask}
                aria-label="toggle password visibility"
                onMouseDown={this.handleMouseDownPassword}
              />
            </InputAdornment>
          ),
          disableUnderline: true,
          "aria-label": "Password",
        }}
      />
    )
  }
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired
}

export default PasswordInput
