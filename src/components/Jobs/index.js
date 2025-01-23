import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import Filters from '../Filters'
import './index.css'

const apiStatusConstants = {
  sucess: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.in_progress,
    employmenType: [],
    minimumPackage: '',
    searchQuery: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {employmenType, minimumPackage, searchQuery} = this.state
    const employment = employmenType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${minimumPackage}&search=${searchQuery}`
    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({apiStatus: apiStatusConstants.sucess, jobsList: data.jobs})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderView = () => {
    const {apiStatus, jobsList} = this.state
    switch (apiStatus) {
      case apiStatusConstants.sucess:
        return (
          <ul>
            {jobsList.length > 0 ? (
              jobsList.map(job => (
                <li key={job.id}>
                  <JobItem job={job} />
                </li>
              ))
            ) : (
              <div className="flexC">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters.</p>
              </div>
            )}
          </ul>
        )
      case apiStatusConstants.failure:
        return (
          <div className="flexC">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.getJobs}>
              Retry
            </button>
          </div>
        )
      case apiStatusConstants.in_progress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  onChangeSearch = e => {
    this.setState({searchQuery: e.target.value})
  }

  onFilterEmployement = e => {
    const {value} = e.target
    this.setState(
      prevState => ({
        employmenType: prevState.employmenType.includes(value)
          ? prevState.employmenType.filter(item => item !== value)
          : [...prevState.employmenType, value],
      }),
      this.getJobs,
    )
  }

  onFilterSalary = e => {
    const {value} = e.target
    this.setState(
      {
        minimumPackage: value,
      },
      this.getJobs,
    )
  }

  updateSearch = () => {
    this.getJobs()
  }

  render() {
    return (
      <div className="jobs">
        <div className="leftContainer">
          <Filters
            onFilterEmployement={this.onFilterEmployement}
            onFilterSalary={this.onFilterSalary}
          />
        </div>
        <div className="rightContainer">
          <div className="inputC">
            <input
              className="search"
              type="search"
              placeholder="Search"
              onChange={e => {
                this.onChangeSearch(e)
              }}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="btn2"
              onClick={this.updateSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderView()}
        </div>
      </div>
    )
  }
}
export default Jobs
