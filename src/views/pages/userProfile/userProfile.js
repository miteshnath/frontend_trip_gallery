import React from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
import {
	CButton,
	CCard,
	CCardBody,
	CCardFooter,
	CCardHeader,
	CCol,
	CForm,
	CFormGroup,
	CFormText,
	CInput,
	CInputFile,
	CLabel,
	CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: 'username',
			firstName: null,
			lastName: null,
			email: null,
			profile_file: null
		};
	}

	componentDidMount() {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/user-profile', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwt_token')
				}
			})
			.then((res) => {
				this.setState({ userName: res.data.data.username });
				this.setState({ email: res.data.data.email });
				this.setState({ profile_file: res.data.data.dp });
			})
			.catch((err) => {
				if (err.response) {
					notify.show('oops! something unexpected occurred', 'error', 1000);
				} else if (err.request) {
					console.log(err.request);
				} else if (err.message) {
					console.log(err.message);
				}
			});
	}

	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	handleProfilePictureChange = (event) => {
		this.setState({ profile_file: event.target.files[0] });
	};

	submitUpdateUserProfile = (event) => {
		axios
			.post(
				'http://localhost:5000/user-profile',
				{
					email: this.state.email,
					username: this.state.username,
					dp: this.state.profile_file
				},
				{ headers: { Authorization: localStorage.getItem('jwt_token'), 'Content-Type': 'application/json' } }
			)
			.then((res) => {
				console.log(res);
				notify.show(res.data.data.message, 'success', 1000);
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
			<div>
				<CRow>
					<CCol xs="12" md="12">
						<CCard>
							<CCardHeader>User Profile</CCardHeader>
							<CCardBody>
								<CForm
									action=""
									method="post"
									encType="multipart/form-data"
									className="form-horizontal"
								>
									<CFormGroup row>
										<CCol md="3">
											<CLabel>Username</CLabel>
										</CCol>
										<CCol xs="12" md="9">
											<p className="form-control-static">{this.state.userName}</p>
											<CFormText className="help-block">Username is not updateable.</CFormText>
										</CCol>
									</CFormGroup>
									<CFormGroup row>
										<CCol md="3">
											<CLabel htmlFor="email-input">Email Input</CLabel>
										</CCol>
										<CCol xs="12" md="4">
											<CInput
												type="email"
												id="email-input"
												name="email-input"
												placeholder="Enter Email"
												autoComplete="email"
												onChange={this.handleEmailChange}
											/>
											<CFormText className="help-block">Please enter your email</CFormText>
										</CCol>
									</CFormGroup>
									<CFormGroup row>
										<CLabel col md="3" htmlFor="file-input">
											Profile Picture
										</CLabel>
										<CCol xs="12" md="9">
											<CInputFile
												id="file-input"
												name="file-input"
												onChange={this.handleProfilePictureChange}
											/>
										</CCol>
									</CFormGroup>
								</CForm>
							</CCardBody>
							<CCardFooter>
								<CButton type="submit" size="lg" color="primary" onClick={this.submitUpdateUserProfile}>
									<CIcon name="cil-scrubber" /> Update
								</CButton>
							</CCardFooter>
						</CCard>
					</CCol>
				</CRow>
				<Notifications />
			</div>
		);
	}
}

export default UserProfile;
