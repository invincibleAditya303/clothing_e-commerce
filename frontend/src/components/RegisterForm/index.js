import {Component} from 'react'

import './index.css'

class RegisterForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    showSubmitError: false,
    showSuccessMsg: false,
    successMsg: '',
    errorMsg: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, email, password} = this.state
    const userDetails = {name, email, password}
    const url = 'http://localhost:5000/api/auth/register'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({showSuccessMsg: true, successMsg: data, showSubmitError: false})
    } else {
      this.setState({showSubmitError: true, errorMsg: data, showSuccessMsg: true})
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="user-input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="user-input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="name-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  renderNameField = () => {
    const {name} = this.state

    return (
      <>
        <label className="user-input-label" htmlFor="name">
          NAME
        </label>
        <input
          type="text"
          id="name"
          className="name-input-field"
          value={name}
          onChange={this.onChangeName}
          placeholder="Name"
        />
      </>
    )
  }

  render() {
    
            const {showSuccessMsg, successMsg, showSubmitError, errorMsg} = this.state


            return (
                <div className="register-form-container">
                    <img
                    src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1744568132/shopping-cart-3d-render-icon_gmd4xd.jpg"
                    className="register-website-logo-mobile-img"
                    alt="website logo"
                    />
                    <img
                    src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1757255972/member-log-membership-username-password-concept_aa6pe9.jpg"
                    className="register-img"
                    alt="website login"
                    />
                    <form className="user-form-container" onSubmit={this.submitForm}>
                    <img
                        src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1744568132/shopping-cart-3d-render-icon_gmd4xd.jpg"
                        className="register-website-logo-desktop-img"
                        alt="website logo"
                    />
                    <div className="user-input-container">{this.renderNameField()}</div>
                    <div className="user-input-container">{this.renderEmailField()}</div>
                    <div className="user-input-container">{this.renderPasswordField()}</div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                    {showSuccessMsg && <p className="register-success-msg">{successMsg}</p>}
                    {showSubmitError && <p className="register-error-message">*{errorMsg}</p>}
                    </form>
                </div>
            )
   
  }
}

export default RegisterForm