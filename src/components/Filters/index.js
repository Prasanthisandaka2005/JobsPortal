import ProfileData from '../ProfileData'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = ({onFilterEmployement, onFilterSalary}) => (
  <div>
    <ProfileData />
    <hr />
    <ul className="list">
      <h1 className="hs">Type of Employment</h1>
      {employmentTypesList.map(item => (
        <li key={item.employmentTypeId} className="filter">
          <input
            type="checkbox"
            value={item.employmentTypeId}
            id={item.employmentTypeId}
            onChange={onFilterEmployement}
          />
          <label htmlFor={item.employmentTypeId}>{item.label}</label>
        </li>
      ))}
    </ul>
    <hr />
    <ul className="list">
      <h1 className="hs">Salary Range</h1>
      {salaryRangesList.map(item => (
        <li key={item.salaryRangeId} className="filter">
          <input
            type="radio"
            name="salaryRange"
            value={item.salaryRangeId}
            id={item.salaryRangeId}
            onChange={onFilterSalary}
          />
          <label htmlFor={item.salaryRangeId}>{item.label}</label>
        </li>
      ))}
    </ul>
  </div>
)

export default Filters
