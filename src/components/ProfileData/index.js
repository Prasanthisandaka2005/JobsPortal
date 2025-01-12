import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  sucess: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class ProfileData extends Component {
  state = {profileData: {}, apiStatus: apiStatusConstants.in_progress}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({
        apiStatus: apiStatusConstants.sucess,
        profileData: data.profile_details,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderView = () => {
    const {apiStatus, profileData} = this.state
    switch (apiStatus) {
      case apiStatusConstants.sucess:
        return (
          <div className="profile">
            <img src={profileData.profile_image_url} alt="profile" />
            <h1 className="h1">{profileData.name}</h1>
            <p className="p">{profileData.short_bio}</p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div>
            <button type="button" onClick={this.getProfileData}>
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
export default ProfileData
