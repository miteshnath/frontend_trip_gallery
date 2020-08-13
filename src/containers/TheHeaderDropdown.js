import React from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Redirect } from 'react-router';

class TheHeaderDropdown extends React.Component {
	constructor(props) {
		super(props);
		{
			this.state = {
				dp: null,
				goToLogin: false
			};
		}
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
				this.setState({ dp: res.data.data.dp });
			})
			.catch((err) => {
				if (err.response) {
					console.log('oops!');
				} else if (err.request) {
					console.log(err.request);
				} else if (err.message) {
					console.log(err.message);
				}
			});
	}

	handleLogout = () => {
		axios
			.patch(process.env.REACT_APP_BACKEND_URL + '/logout', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('jwt_token')
				}
			})
			.then((res) => {
				this.setState({ goToLogin: true });
				localStorage.clear();
			})
			.catch((err) => {
				if (err.response) {
					console.log('oops!');
				} else if (err.request) {
					console.log(err.request);
				} else if (err.message) {
					console.log(err.message);
				}
			});
	};

	render() {
		if (this.state.goToLogin) {
			return <Redirect to={'/login'} />;
		}
		return (
			<CDropdown inNav className="c-header-nav-items mx-2" direction="down">
				<CDropdownToggle className="c-header-nav-link" caret={false}>
					<div className="c-avatar">
						<CImg src={this.state.dp} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
					</div>
				</CDropdownToggle>
				<CDropdownMenu className="pt-0" placement="bottom-end">
					<CDropdownItem onClick={this.handleLogout}>
						<CIcon name="cil-user" className="mfe-2"  />
						Logout
					</CDropdownItem>
				</CDropdownMenu>
			</CDropdown>
		);
	}
}

export default TheHeaderDropdown;
