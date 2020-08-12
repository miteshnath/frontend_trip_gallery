import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CInput,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: null,
			passWord: null,
			isUserAuthenticated: false
		};
	}

	componentDidUpdate(e) {}

	setUserName = (event) => {
		this.setState({ userName: event.target.value });
	};

	setPassWord = (event) => {
		this.setState({ passWord: event.target.value });
	};

	logIn = () => {
		axios
			.post(
				'http://localhost:5000/login',
				{ username: this.state.userName, password: this.state.passWord },
				{ headers: { 'Content-Type': 'application/json' } }
			)
			.then((res) => {
				this.setState({ isUserAuthenticated: true });
				localStorage.setItem('jwt_token', res.data.access_token);
				notify.show('Login Successful', 'success', 1000);
			})
			.catch((err) => {
				if (err.response) {
					notify.show(err.response.data.error, 'error', 1000);
				} else if (err.request) {
					console.log(err.request);
				} else if (err.message) {
					console.log(err.message);
				}
			});
	};

	render() {
		return (
			<div className="c-app c-default-layout flex-row align-items-center">
				{!this.state.isUserAuthenticated && (
					<CContainer>
						<CRow className="justify-content-center">
							<CCol md="8">
								<CCardGroup>
									<CCard className="p-4">
										<CCardBody>
											<CForm>
												<h1>Login</h1>
												<p className="text-muted">Sign In to your account</p>
												<CInputGroup className="mb-3">
													<CInputGroupPrepend>
														<CInputGroupText>
															<CIcon name="cil-user" />
														</CInputGroupText>
													</CInputGroupPrepend>
													<CInput
														type="text"
														placeholder="Username"
														onChange={this.setUserName}
														autoComplete="username"
													/>
												</CInputGroup>
												<CInputGroup className="mb-4">
													<CInputGroupPrepend>
														<CInputGroupText>
															<CIcon name="cil-lock-locked" />
														</CInputGroupText>
													</CInputGroupPrepend>
													<CInput
														type="password"
														placeholder="Password"
														onChange={this.setPassWord}
														autoComplete="current-password"
													/>
												</CInputGroup>
												<CRow>
													<CCol xs="6">
														<CButton color="primary" onClick={this.logIn} className="px-4">
															Login
														</CButton>
													</CCol>
													<CCol xs="6" className="text-right">
														<CButton color="link" className="px-0">
															Forgot password?
														</CButton>
													</CCol>
												</CRow>
											</CForm>
										</CCardBody>
									</CCard>
									<CCard
										className="text-white bg-primary py-5 d-md-down-none"
										style={{ width: '44%' }}
									>
										<CCardBody className="text-center">
											<div>
												<h2>Sign up</h2>
												<p>Register to create a new account.</p>
												<Link to="/register">
													<CButton color="primary" className="mt-3" active tabIndex={-1}>
														Register Now!
													</CButton>
												</Link>
											</div>
										</CCardBody>
									</CCard>
								</CCardGroup>
							</CCol>
						</CRow>
					</CContainer>
				)}
				<Notifications options={{zIndex: 200, top: '50px'}} />
				{/* {
          this.state.isUserAuthenticated 
        } */}
			</div>
		);
	}
}

export default Login;
