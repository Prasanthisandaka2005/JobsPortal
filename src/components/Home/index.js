import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="home">
    <div className="lefthome">
      <h1 className="homeH">Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs, salary information, company
        reviews. Find the jobs that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button">Find Jobs</button>
      </Link>
    </div>
  </div>
)
export default Home
