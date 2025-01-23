import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import {doc, getDoc} from 'firebase/firestore'
import {auth, db} from '../Firebase'

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
    auth.onAuthStateChanged(async user => {
      console.log(user)
      const docRef = doc(db, 'Users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.setState({profileData: docSnap.data()})
        console.log(docSnap.data())
      }
    })
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
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <h1 className="h1">{profileData.username}</h1>
            <p className="p">{profileData.email}</p>
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
            <Loader type="ThreeDots" color="black" height="50" width="50" />
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
