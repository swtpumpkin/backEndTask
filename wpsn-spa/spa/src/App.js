import React, { Component } from 'react'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default class App extends Component {
  state = {
    popupWindow: null,
    token: null,
    signingIn: false,
    userInfo: null
  }

  tokenHandler = e => {
    const token = e.data
    if (token) {
      window.localStorage.token = token
    }
    this.state.popupWindow.close()
    this.setState({
      token,
      complete: true,
      popupWindow: null,
      signingIn: false
    })
    this.updateUserInfo()
  }

  updateUserInfo = () => {
    axios.get(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(res => {
        const {provider, providerUserId} = res.data
        this.setState({
          userInfo: `${provider}:${providerUserId}`
        })
      })
  }

  componentWillMount() {
    if (localStorage.token) {
      this.setState({
        token: localStorage.token
      })
    }
  }

  componentDidMount() {
    if (this.state.token) {
      this.updateUserInfo()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.tokenHandler)
  }

  logIn = e => {
    window.addEventListener('message', this.tokenHandler)
    const popupWindow = window.open(`${API_URL}/auth`)
    this.setState({
      popupWindow,
      signingIn: true
    })
  }

  logOut = e => {
    delete localStorage.token
    this.setState({
      token: null,
      userInfo: null
    })
  }

  render() {
    return this.state.userInfo ? (
      <div>
        Hello {this.state.userInfo}
        <button onClick={this.logOut}>Log out</button>
      </div>
    ) : this.state.token ? (
        <div>Loading...</div>
    ) : this.state.signingIn ? (
      <div>Signing in...</div>
    ) : (
      <div>
        <button onClick={this.logIn}>Sign in</button>
      </div>
    )
  }
}
