import {Link} from 'react-router-dom'
import './index.css'
import {FaRegStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {IoIosBriefcase} from 'react-icons/io'

const JobItem = ({job}) => (
  <Link to={`/jobs/${job.id}`}>
    <div className="job">
      <div className="flexH">
        <img
          src={job.company_logo_url}
          alt="company logo"
          className="companyLogo"
        />
        <div className="flexC">
          <h1 className="hm">{job.title}</h1>
          <p>
            <FaRegStar className="star" /> {job.rating}
          </p>
        </div>
      </div>
      <div className="locations">
        <div className="flexH">
          <p>
            <IoLocationSharp /> {job.location}
          </p>
          <p>
            <IoIosBriefcase />
            {job.employment_type}
          </p>
        </div>
        <p className="pack">{job.package_per_annum}</p>
      </div>
      <hr className="h" />
      <h1 className="hm">Description</h1>
      <p>{job.job_description}</p>
    </div>
  </Link>
)
export default JobItem
