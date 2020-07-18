import React, { Component } from 'react'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { blue, deepPurple } from '@material-ui/core/colors';
import { UserSession, AppConfig } from 'blockstack'
import { Connect } from '@blockstack/connect'
import Cookies from 'universal-cookie'
import TopBar from './components/TopBar'
import Profile from './Profile.js'
import Signin from './Signin.js'

const current = new Date()
const nextYear = new Date()
nextYear.setFullYear(current.getFullYear() + 1)

const cookies = new Cookies()
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null,
      darkTheme: cookies.get('themeColor') === 'dark',
      theme() {
        if (cookies.get('themeColor') === 'dark') {
          return createMuiTheme({
            palette: { type: 'dark', primary: deepPurple }
          })
        }
        return createMuiTheme({ palette: { primary: blue } })
      },
    }

    this.toggleTheme = this.toggleTheme.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut(e) {
    e.preventDefault()
    this.setState({ userData: null })
    userSession.signUserOut(window.location.origin)
  }

  toggleTheme() {
    if (this.state.darkTheme) {
      cookies.set('themeColor', 'light', { path: '/', expires: nextYear })
      this.setState({
        theme() { return createMuiTheme({ palette: { primary: blue } }) },
        darkTheme: false
      })
    } else {
      cookies.set('themeColor', 'dark', { path: '/', expires: nextYear })
      this.setState({
        theme() {
          return createMuiTheme({
            palette: { type: 'dark', primary: deepPurple }
          })
        },
        darkTheme: true
      })
    }
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
      <MuiThemeProvider theme={this.state.theme()}>
        <CssBaseline />
        <TopBar toggleTheme={this.toggleTheme} />
        <Connect authOptions={authOptions}>
          {
            !userData ? <Signin /> :
            <Profile userData={userData} handleSignOut={ this.handleSignOut } />
          }
        </Connect>
      </MuiThemeProvider>
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
