import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  Toolbar, CssBaseline, MuiThemeProvider, createMuiTheme
} from '@material-ui/core'
import { blue, deepPurple } from '@material-ui/core/colors';
import { UserSession, AppConfig } from 'blockstack'
import { Connect } from '@blockstack/connect'
import Cookies from 'universal-cookie'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import Error404 from './pages/Error404'
import Landing from './pages/Landing'
import About from './pages/About'
import Board from './pages/Board'

const nextYear = new Date()
nextYear.setFullYear(nextYear.getFullYear() + 1)

const cookies = new Cookies()
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false,
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

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.toggleTheme = this.toggleTheme.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleOpen() { this.setState({ opened: true }) }
  handleClose() { this.setState({ opened: false }) }

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
        opened: false,
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
        opened: false,
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
        <CssBaseline /><Toolbar />

        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/:name"
              render={(props) => <Board user={this.state.userData} {...props} />}
            />
            <Route component={Error404} />
          </Switch>
        </Suspense>

        <Connect authOptions={authOptions}>
          <TopBar
            userData={userData}
            handleOpen={this.handleOpen}
            handleSignOut={this.handleSignOut}
            toggleTheme={this.toggleTheme}
          />
          <SideBar
            userData={userData}
            open={this.state.opened}
            handleClose={this.handleClose}
            toggleTheme={this.toggleTheme}
            handleSignOut={this.handleSignOut}
          />
        </Connect>

        <Footer />

        <Redirect to={this.state.userData ? this.state.userData.username : ''} />
      </MuiThemeProvider>
    )
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData })
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData() })
    }
  }
}

export default App
