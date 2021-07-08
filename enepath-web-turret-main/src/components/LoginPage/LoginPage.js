import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

// Redux;
import { connect } from 'react-redux'
import { setStartUpState, connectToSocket } from '../../redux/actions/stationActions';
import { loginUser } from '../../redux/actions/userActions';

// Import logo;
import enepath from '../../assets/logo/enepath.png';

class LoginPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      email:"",
      password: "",
      loadingUser: false,
      errors: {}
    }
  }

  changeHandler = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const body = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(body);
  }

  componentDidMount = () => {
    if (!this.props.stationData.startup_state) {
      this.props.setStartUpState();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.connecting) this.setState({ loadingUser: true })
    if (nextProps.user.authenticated) { 
      this.setState({loadingUser: false}) 
      this.props.history.push('/')
    }
    if (nextProps.user.errors) {
      this.setState({ errors: nextProps.user.errors, loadingUser: false })
    }

  }

  render() {
    return <div className="Login container">
      <div className="row justify-content-center form-container my-5">
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <div className="card-body account-wall">
              <img className="profile-img" src={enepath}
                    alt=""></img>

                <h4 className="text-danger font-weight-bold text-center mt-4">{
                  this.state.errors && this.state.errors.type
                }</h4>
                {!this.state.loadingUser ? <Form onSubmit={this.handleSubmit} className="form-signin">
                <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Button block size="sm" type="submit">
                    Login
                  </Button>
                </Form.Group>
              </Form> : 
              <div className="text-center mt-5">
                <h3>Connecting...</h3>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

const mapStateToProps = (state) => {
  return {
    stationData: state.station,
    user: state.user
  }
}

const mapDispatchToProps = {
setStartUpState, loginUser, connectToSocket
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);