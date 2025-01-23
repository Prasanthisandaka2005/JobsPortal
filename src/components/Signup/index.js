/* eslint-disable prettier/prettier */
import {useState} from 'react'
import './index.css'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom/cjs/react-router-dom.min'
import {auth, db} from '../Firebase'

const Signup = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const onSubmitForm = async e => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      console.log(user)
      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          username,
        })
      }
      toast.success('User Registered Successfully', {position: 'top-center'})
      const {history} = props
      history.replace('/login')
    } catch (error) {
      toast.error(error.message, {position: 'bottom-center'})
    }
  }
  return (
    <div className="main">
      <div className="loginContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
        <form onSubmit={onSubmitForm} className="form">
          <div className="inputContainer">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              className="input"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              placeholder="Enter Email ID"
              id="Email"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div>
          Already have an account
          <Link to="/login" className="a">
            {' '}
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
