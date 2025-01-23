import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {toast} from 'react-toastify'

const Navbar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
    toast.success('Logged Out Successfully', {position: 'top-center'})
  }
  return (
    <div className="navContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <ul className="links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/jobs">
          <li>Jobs</li>
        </Link>
      </ul>
      <li>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </div>
  )
}
export default withRouter(Navbar)
