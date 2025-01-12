import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = data => {
    this.setState({errMsg: data.error_msg})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data)
    }
  }

  render() {
    const {errMsg, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main">
        <div className="loginContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.onSubmitForm} className="form">
            <div className="inputContainer">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                className="input"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit">Login</button>
            {errMsg && <p className="err">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
