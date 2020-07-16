import React, { Component } from 'react'
import Profile from './Profile.js'
import Signin from './Signin.js'
import { UserSession, AppConfig } from 'blockstack'
import { Connect } from '@blockstack/connect'

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { userData: null }

    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut(e) {
    e.preventDefault()
    this.setState({ userData: null })
    userSession.signUserOut(window.location.origin)
  }

  render() {
    const { userData } = this.state
    const authOptions = {
      appDetails: {
        name: 'The View Point Site',
        icon: window.location.origin + '/icon-192x192.png'
      },
      userSession,
      finished: ({ userSession }) => {
        this.setState({ userData: userSession.loadUserData() })
      }
    }
    return (
      <Connect authOptions={authOptions}>
        { !userData ? <Signin /> : <Profile userData={userData} handleSignOut={ this.handleSignOut } /> }
      </Connect>
    )
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() })
    }
  }
}

export default App
