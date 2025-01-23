import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
    <ToastContainer />
  </>
)

export default App
