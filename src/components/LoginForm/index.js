import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = event => {
    if (event.target.checked) {
      this.setState({
        showPassword: true,
      })
    } else {
      this.setState({
        showPassword: false,
      })
    }
  }

  render() {
    const {username, password, showPassword, showError, errorMsg} = this.state
    const typeText = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="background">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="watch-logo"
            alt="nxt watch logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="userName">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input-box"
                onChange={this.onChangeUsername}
                value={username}
                id="userName"
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="passWord">
                PASSWORD
              </label>
              <input
                type={typeText}
                placeholder="Password"
                className="input-box"
                onChange={this.onChangePassword}
                value={password}
                id="passWord"
              />
            </div>
            <div className="check-box-container">
              <input
                type="checkbox"
                id="checkBox"
                onChange={this.onChangeCheckbox}
              />
              <label className="check-label" htmlFor="checkBox">
                Show Password
              </label>
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {showError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
