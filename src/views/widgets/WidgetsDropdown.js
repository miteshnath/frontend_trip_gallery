import React from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
import {
	CButton,
	CWidgetDropdown,
	CRow,
	CCol,
	CDropdown,
	CDropdownMenu,
	CDropdownItem,
	CDropdownToggle
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Redirect } from 'react-router';

class WidgetsDropdown extends React.Component {
	constructor(props) {
		super(props);
		{
			this.state = {
				userTrips: [],
				goToTrip: false,
				goToTripMap: false,
				selectedTrip: null
			};
		}
	}

	componentDidMount() {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/trips', {
				headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('jwt_token') }
			})
			.then((res) => {
				this.setState({ userTrips: res.data.trips });
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

	handleViewDetails = (id) => {
		this.setState({ selectedTrip: id });
		this.setState({ goToTrip: !this.state.goToTrip });
	};

	handleTripMapView = (id) => {
		this.setState({ selectedTrip: id });
		this.setState({ goToTripMap: !this.state.goToTrip });
	};

	render() {
		if (this.state.goToTrip) {
			return <Redirect to={'/trips/' + this.state.selectedTrip} />;
		}

		if (this.state.goToTripMap) {
			return <Redirect to={'/trip-maps/' + this.state.selectedTrip} />;
		}

		let trips = [];
		for (let trip of this.state.userTrips) {
			trips.push(
				<CCol sm="6" lg="3" key={trip.id}>
					<CWidgetDropdown color="gradient-primary" header={trip.name} text="" footerSlot={<hr />}>
						<CDropdown>
							<CDropdownToggle color="transparent">
								<CIcon name="cil-settings" />
							</CDropdownToggle>
							<CDropdownMenu className="pt-0" placement="bottom-end">
								<CDropdownItem onClick={() => this.handleViewDetails(trip.id)}>Details</CDropdownItem>
								<CDropdownItem onClick={() => this.handleTripMapView(trip.id)}>Trip Map</CDropdownItem>
							</CDropdownMenu>
						</CDropdown>
					</CWidgetDropdown>
				</CCol>
			);
		}
		return <CRow>{trips}</CRow>;
	}
}
export default WidgetsDropdown;
