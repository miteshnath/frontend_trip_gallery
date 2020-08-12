import React from 'react';

const UserProfile = React.lazy(() => import('./views/pages/userProfile/userProfile'));
const AddTrip = React.lazy(() => import('./views/pages/addTrip/addTrip'));
const Trip = React.lazy(() => import('./views/pages/tripDetails/TripDetails'));
const MapView = React.lazy(() => import('./views/pages/addTrip/MapChart'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: AddTrip },
  { path: '/trips/:id', exact: true, name: 'Trip Details', component: Trip },
  { path: '/user-profile', name: 'User Profile', component: UserProfile },
  {path: '/trip-maps/:id', name: 'Trip Map',  component: MapView}
];

export default routes;
