import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {IoIosBriefcase} from 'react-icons/io'
import {GoLinkExternal} from 'react-icons/go'

import './index.css'

const apiStatusConstants = {
  sucess: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    apiStatus: apiStatusConstants.in_progress,
    similarJobs: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.sucess,
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderView = () => {
    const {apiStatus, jobDetails, similarJobs} = this.state
    switch (apiStatus) {
      case apiStatusConstants.sucess:
        return (
          <div>
            <div className="details">
              <div className="jobD">
                <div className="flexH">
                  <img
                    src={jobDetails.company_logo_url}
                    alt="job details company logo"
                    className="companyLogo"
                  />
                  <div className="flexC">
                    <h1 className="hm">{jobDetails.title}</h1>
                    <p>
                      <FaRegStar className="star" /> {jobDetails.rating}
                    </p>
                  </div>
                </div>
                <div className="locations">
                  <div className="flexH">
                    <p>
                      <IoLocationSharp /> {jobDetails.location}
                    </p>
                    <p>
                      <IoIosBriefcase />
                      {jobDetails.employment_type}
                    </p>
                  </div>
                  <p className="pack">{jobDetails.package_per_annum}</p>
                </div>
                <hr className="h" />
                <div className="flexH flexSb">
                  <h1 className="hm">Description</h1>
                  <a href={jobDetails.company_website_url}>
                    Visit <GoLinkExternal />
                  </a>
                </div>
                <p>{jobDetails.job_description}</p>
              </div>
              <div className="flexC">
                <h1 className="hm">Skills</h1>
                <ul className="flexH flexSb">
                  {jobDetails.skills.map(skill => (
                    <li key={skill.name} className="flexH">
                      <img
                        src={skill.image_url}
                        alt={skill.name}
                        className="skillLogo"
                      />
                      <p className="hs">{skill.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flexH">
                <div className="flexC">
                  <h1 className="hm">Life at Company</h1>
                  <p>{jobDetails.life_at_company.description}</p>
                </div>
                <img
                  src={jobDetails.life_at_company.image_url}
                  alt="life at company"
                  className="lifeImg"
                />
              </div>
            </div>
            <div>
              <h1>Similar Jobs</h1>
              <ul className="flexH">
                {similarJobs.map(item => (
                  <li key={item.id} className="similarJob">
                    <div className="flexH">
                      <img
                        src={item.company_logo_url}
                        alt="similar job company logo"
                        className="companyLogo"
                      />
                      <div className="flexC">
                        <h1 className="hm">{item.title}</h1>
                        <p>
                          <FaRegStar className="star" /> {item.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flexH">
                      <p>
                        <IoLocationSharp /> {item.location}
                      </p>
                      <p>
                        <IoIosBriefcase />
                        {item.employment_type}
                      </p>
                    </div>
                    <h1 className="hm">Description</h1>
                    <p>{item.job_description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.getJobDetails}>
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

  render() {
    return <div>{this.renderView()}</div>
  }
}
export default JobDetails
