import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify'
import {auth} from '../Firebase'

class Login extends Component {
  state = {email: '', password: '', errMsg: ''}

  onChangeemail = e => {
    this.setState({email: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async e => {
    e.preventDefault()
    try {
      const {email, password} = this.state
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('User Logged In Successfully', {position: 'top-center'})
      this.setState({email: '', password: ''})
      const userdetails = {username: 'rahul', password: 'rahul@2021'}
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userdetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.onSuccess(data.jwt_token)
      }
    } catch (error) {
      toast.error(error.message, {position: 'bottom-center'})
    }
  }

  render() {
    const {errMsg, password, email} = this.state
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
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter Email ID"
                id="email"
                className="input"
                value={email}
                onChange={this.onChangeemail}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                className="input"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit">Login</button>
            {errMsg && <p className="err">*{errMsg}</p>}
          </form>
          <div>
            Do no have an account
            <Link to="/signup" className="a">
              {' '}
              SignUp
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
