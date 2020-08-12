import React, { lazy } from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

import {
	CButton,
	CCard,
	CCardBody,
	CModal,
	CModalBody,
	CModalHeader,
	CModalFooter,
	CModalTitle,
	CCol,
	CForm,
	CFormGroup,
	CFormText,
	CInput,
	CInputFile,
	CLabel,
	CRow
} from '@coreui/react';
import Select from 'react-select';

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'));


class AddTrip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTripId: '',
			addTrip: false,
			addLocation: false,
			addPhoto: false,
			tripName: '',
			tripDest1: '',
			tripDest2: '',
			tripStart: null,
			tripEnd: null,
			tripLocations: [],
			imgCollection: [],
			pictures: [],
			additionalLocation: '',
			userTrips: [],
			userTripOptions: [],
			tripPhotoFile: null,
			isUserAuthenticated: false
		};
	}

	componentDidMount = () => {
		let token = localStorage.getItem('jwt_token');
		if (token) {
			this.setState({isUserAuthenticated: true})
		}

		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/trips', {
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('jwt_token') }
			})
			.then((res) => {
				this.setState({ userTrips: res.data.trips });
				let tripOptions = [];
				for (let i = 0; i < res.data.trips.length; i++) {
					let name = res.data.trips[i]['name'];
					let id = res.data.trips[i]['id'];
					tripOptions.push({ value: name, label: name, id: id });
				}
				this.setState({ userTripOptions: tripOptions });
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
	};

	setAddTrip = () => {
		this.setState({ addTrip: !this.state.addTrip });
	};

	setAddLocation = () => {
		this.setState({ addLocation: !this.state.addLocation });
	};

	setAddPhoto = () => {
		this.setState({ addPhoto: !this.state.addPhoto });
	};

	submitAddTrip = () => {
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL + '/trips',
				{
					name: this.state.tripName,
					start_date: this.state.tripStart,
					end_date: this.state.tripEnd,
					locations: [ this.state.tripDest1, this.state.tripDest2 ]
				},
				{ headers: { Authorization: localStorage.getItem('jwt_token'), 'Content-Type': 'application/json' } }
			)
			.then((res) => {
				window.location.reload(false);
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

	handleTripNameChange = (event) => {
		this.setState({ tripName: event.target.value });
	};

	handleTripDest1Change = (event) => {
		this.setState({ tripDest1: event.target.value });
	};

	handleTripDest2Change = (event) => {
		this.setState({ tripDest2: event.target.value });
	};

	handleTripStartChange = (event) => {
		this.setState({ tripStart: event.target.value });
	};

	handleTripEndChange = (event) => {
		this.setState({ tripEnd: event.target.value });
	};

	submitData = (event) => {
		var formData = new FormData();
		for (const key of Object.keys(this.state.imgCollection)) {
			formData.append('imgCollection', this.state.imgCollection[key]);
		}
		axios.post(process.env.REACT_APP_BACKEND_URL + '/trips/13/photos', formData, {}).then((res) => {
			console.log(res.data);
		});
	};

	addAdditionalLocation = (event) => {
		this.setState({ additionalLocation: event.target.value });
	};

	submitAddAdditionalLocation = () => {
		axios
			.patch(
				process.env.REACT_APP_BACKEND_URL + '/trips/' + this.state.selectedTripId,
				{ locations: this.state.additionalLocation },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('jwt_token')
					}
				}
			)
			.then((res) => {
				notify.show(res.data.message, 'success', 1000);
				window.location.reload(false);
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
	};

	handleTripSelect = (trip) => {
		this.setState({ selectedTripId: trip.id });
	};

	submitAddPhoto = () => {
		let bodyFormData = new FormData();
		bodyFormData.append('file', this.state.tripPhotoFile);
		axios
			.post(process.env.REACT_APP_BACKEND_URL + '/trips/' + this.state.selectedTripId + '/photos', bodyFormData, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: localStorage.getItem('jwt_token')
				}
			})
			.then((res) => {
				notify.show('added trip photo successfully', 'success', 1000);
				window.location.reload(false);
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
	};

	handleTripPhoto = (event) => {
		this.setState({ tripPhotoFile: event.target.files[0] });
	};

	render() {
		 
		return (
			<div>
				<CRow>
					<CCol>
						<CCard>
							{/* <CCardHeader>Dashboard</CCardHeader> */}
							<CCardBody>
								<CButton
									color="primary"
									onClick={() => this.setAddTrip(!this.state.addTrip)}
									className="mr-1"
								>
									Create New Trip
								</CButton>
								<CButton
									color="success"
									onClick={() => this.setAddLocation(!this.state.addLocation)}
									className="mr-1"
								>
									Add Additional Trip Destination
								</CButton>
								<CButton
									color="info"
									onClick={() => this.setAddPhoto(!this.state.addPhoto)}
									className="mr-1"
								>
									Add Trip Photos
								</CButton>

								<CModal
									show={this.state.addTrip}
									onClose={() => this.setAddTrip(!this.state.addTrip)}
									color="primary"
								>
									<CModalHeader closeButton>
										<CModalTitle>Trip Details</CModalTitle>
									</CModalHeader>
									<CModalBody>
										<CForm
											action=""
											method="post"
											encType="multipart/form-data"
											className="form-horizontal"
										>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="text-input">Trip Name</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<CInput
														id="text-input"
														name="text-input"
														placeholder=""
														onChange={this.handleTripNameChange}
													/>
													<CFormText>choose a catchy name</CFormText>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="text-input-1">Destination 1</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<CInput
														id="text-input-1"
														name="text-input-1"
														placeholder=""
														onChange={this.handleTripDest1Change}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="text-input-2">Destination 2</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<CInput
														id="text-input-2"
														name="text-input-2"
														placeholder=""
														onChange={this.handleTripDest2Change}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="date-input-start">Start Date</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<CInput
														type="date"
														id="date-input-start"
														name="date-input-start"
														placeholder="date"
														onChange={this.handleTripStartChange}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="date-input-end">End Date</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<CInput
														type="date"
														id="date-input-end"
														name="date-input-end"
														placeholder="date"
														onChange={this.handleTripEndChange}
													/>
												</CCol>
											</CFormGroup>
										</CForm>
									</CModalBody>
									<CModalFooter>
										<CButton color="primary" onClick={this.submitAddTrip}>
											Add Trip
										</CButton>{' '}
										<CButton color="secondary" onClick={() => this.setAddTrip(!this.state.addTrip)}>
											Cancel
										</CButton>
									</CModalFooter>
								</CModal>

								<CModal
									show={this.state.addLocation}
									onClose={() => this.setAddLocation(!this.state.addLocation)}
									color="success"
								>
									<CModalHeader closeButton>
										<CModalTitle>Add Visited Location</CModalTitle>
									</CModalHeader>
									<CModalBody>
										<CForm
											action=""
											method="post"
											encType="multipart/form-data"
											className="form-horizontal"
										>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="select">Trip</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<Select
														className="basic-single"
														classNamePrefix="select"
														defaultValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name="trips"
														options={this.state.userTripOptions}
														onChange={this.handleTripSelect}
													/>
												</CCol>
											</CFormGroup>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="text-input-4">Location</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<CInput
														id="text-input-4"
														name="text-input-4"
														placeholder=""
														onChange={this.addAdditionalLocation}
													/>
													<CFormText>add the location</CFormText>
												</CCol>
											</CFormGroup>
										</CForm>
									</CModalBody>
									<CModalFooter>
										<CButton color="primary" onClick={this.submitAddAdditionalLocation}>
											Add
										</CButton>{' '}
										<CButton
											color="secondary"
											onClick={() => this.setAddLocation(!this.state.addLocation)}
										>
											Cancel
										</CButton>
									</CModalFooter>
								</CModal>

								<CModal
									show={this.state.addPhoto}
									onClose={() => this.setAddPhoto(!this.state.addPhoto)}
									color="info"
								>
									<CModalHeader closeButton>
										<CModalTitle>Add Photos</CModalTitle>
									</CModalHeader>
									<CModalBody>
										<CForm
											action=""
											method="post"
											encType="multipart/form-data"
											className="form-horizontal"
										>
											<CFormGroup row>
												<CCol md="3">
													<CLabel htmlFor="select">Trip</CLabel>
												</CCol>
												<CCol xs="12" md="9">
													<Select
														className="basic-single"
														classNamePrefix="select"
														defaultValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name="trips"
														options={this.state.userTripOptions}
														onChange={this.handleTripSelect}
													/>
												</CCol>
											</CFormGroup>

											<CFormGroup row>
												<CLabel col md="3" htmlFor="file-input">
													Photo
												</CLabel>
												<CCol xs="12" md="9">
													<CInputFile
														id="file-input"
														name="file-input"
														onChange={this.handleTripPhoto}
													/>
												</CCol>
											</CFormGroup>
										</CForm>
									</CModalBody>
									<CModalFooter>
										<CButton color="primary" onClick={this.submitAddPhoto}>
											Upload
										</CButton>{' '}
										<CButton
											color="secondary"
											onClick={() => this.setAddPhoto(!this.state.addPhoto)}
										>
											Cancel
										</CButton>
									</CModalFooter>
								</CModal>
							</CCardBody>
						</CCard>
					</CCol>
				</CRow>
				<Notifications />
				<WidgetsDropdown />
			</div>
		);
	}
}

export default AddTrip;
