import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

const mapStyles = {
	width: '70%',
	height: '70%'
};

export class MapView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			locations: [],
			initLocation: [ { latitude: 28.6517178, longitude: 77.2219388 } ]
		};
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
					_locations.push({ latitude: _loc.lat, longitude: _loc.lng });
				}
				this.setState({
					locations: _locations
				});

				if (_locations.length > 0) {
					this.setState({ initLocation: this.state.initLocation.concat(_locations[0]) });
				}
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

	displayMarkers = () => {
		return this.state.locations.map((location, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: location.latitude,
						lng: location.longitude
					}}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<Map
					google={this.props.google}
					zoom={8}
					style={mapStyles}
					initialCenter={{
						lat: this.state.initLocation[0].latitude,
						lng: this.state.initLocation[0].longitude
					}}
				>
					{this.displayMarkers()}
				</Map>
				<Notifications />
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_API_GOOGLE_KEY
})(MapView);
