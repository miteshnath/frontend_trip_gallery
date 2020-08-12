import React from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
import {
	CButton,
	CCard,
	CCardBody,
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

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: null,
			passWord: null,
			repeatPassWord: null
		};
	}

	setUserName = (event) => {
		this.setState({ userName: event.target.value });
	};

	setRepeatPassWord = (event) => {
		this.setState({ repeatPassWord: event.target.value });
	};

	setPassWord = (event) => {
		this.setState({ passWord: event.target.value });
	};

	handleRegister = () => {
		if (this.state.passWord !== this.state.repeatPassWord) {
			notify.show('passwords must match!', 'error', 2000);
		} else {
			axios
				.post(
					process.env.REACT_APP_BACKEND_URL + '/register',
					{ username: this.state.userName, password: this.state.passWord },
					{ headers: { 'Content-Type': 'application/json' } }
				)
				.then((res) => {
					notify.show(res.data.data, 'success', 1000);
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
		}
	};

	render() {
		return (
			<div className="c-app c-default-layout flex-row align-items-center">
				<CContainer>
					<CRow className="justify-content-center">
						<CCol md="9" lg="7" xl="6">
							<CCard className="mx-4">
								<CCardBody className="p-4">
									<CForm>
										<h1>Register</h1>
										<p className="text-muted">Create your account</p>
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
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>@</CInputGroupText>
											</CInputGroupPrepend>
											<CInput type="text" placeholder="Email" autoComplete="email" />
										</CInputGroup>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-lock-locked" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												type="password"
												placeholder="Password"
												onChange={this.setPassWord}
												autoComplete="new-password"
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
												placeholder="Repeat password"
												onChange={this.setRepeatPassWord}
												autoComplete="new-password"
											/>
										</CInputGroup>
										<CButton color="success" block onClick={this.handleRegister}>
											Create Account
										</CButton>
									</CForm>
								</CCardBody>
							</CCard>
						</CCol>
					</CRow>
				</CContainer>
				<Notifications options={{ zIndex: 200, top: '50px' }} />
			</div>
		);
	}
}

export default Register;
