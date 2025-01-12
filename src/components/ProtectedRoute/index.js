import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'
import Navbar from '../Navbar'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Navbar /> <Route {...props} />
    </>
  )
}
export default ProtectedRoute
