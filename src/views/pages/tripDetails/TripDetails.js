import React from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
import { Carousel } from 'react-bootstrap';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

class Trip extends React.Component {
	constructor(props) {
		super(props);
		{
			this.state = {
				tripId: null,
				tripId: null,
				tripName: null,
				location: null,
				startDate: null,
				endDate: null,
				photos: [],
				totalLocations: 0,
				totalPhotos: 0
			};
		}
	}

	componentDidMount() {
		const tripId = this.props.match.params.id;
		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/trips/' + tripId, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwt_token')
				}
			})
			.then((res) => {
				let _locations = [];
				for (let _loc of res.data.data.locations) {
					_locations.push(_loc.name);
				}
				this.setState({
					tripId: tripId,
					tripName: res.data.data.name,
					locations: _locations.join(', '),
					startDate: res.data.data.start_date,
					endDate: res.data.data.end_date,
					totalPhotos: res.data.data.total_photos,
					totalLocations: res.data.data.total_locations,
					photos: res.data.data.photos
				});
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

	render() {
		return (
			<CRow>
				<CCol lg={6}>
					<CCard>
						<CCardHeader center>
							<strong>Trip Id : </strong>
							{this.state.tripId}
						</CCardHeader>
						<CCardBody>
							<table className="table table-striped table-hover">
								<tbody>
									<tr>
										<td>Name</td>
										<td>
											<strong>{this.state.tripName}</strong>
										</td>
									</tr>
									<tr>
										<td>Locations</td>
										<td>
											<strong>{this.state.locations}</strong>
										</td>
									</tr>
									<tr>
										<td>Start Date</td>
										<td>
											<strong>{this.state.startDate}</strong>
										</td>
									</tr>
									<tr>
										<td>End Date</td>
										<td>
											<strong>{this.state.endDate}</strong>
										</td>
									</tr>
									<tr>
										<td>Total Photos</td>
										<td>
											<strong>{this.state.totalPhotos}</strong>
										</td>
									</tr>{' '}
									<tr>
										<td>Total Places Visited</td>
										<td>
											<strong>{this.state.totalLocations}</strong>
										</td>
									</tr>
								</tbody>
							</table>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol>
					<Carousel>
						{this.state.photos.map((photo) => {
							console.log(photo);
							return (
								<Carousel.Item>
									<img
										className="d-block w-100"
										src={photo.image}
										alt="First slide"
										key={photo.id.toString()}
									/>
									<Carousel.Caption>
										<h3>Trip Images</h3>
									</Carousel.Caption>
								</Carousel.Item>
							);
						})}
					</Carousel>
				</CCol>
			</CRow>
		);
	}
}

export default Trip;
