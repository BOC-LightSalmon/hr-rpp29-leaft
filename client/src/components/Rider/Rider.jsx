import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import './RideBtmPanel.scss';
import RideList from './RideList';
import SelectedRide from './SelectedRide';
import axios from 'axios';
const rides = require('./rideData.json');

const Rider = (props) => {
  const [riderLocation, setRiderLocation] = useState({lat: 37.70, lng: -121.876999});
  const [nearbyRides, setNearbyRides] = useState(rides); // this will be an array with all the columns (or not) of the Routes table, it will have all the info including pick up and dropoff locations, times where the riderLocation is equal to Ride.zip
  const [rideSelected, setRideSelected] = useState(false);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelRideModal, setShowCancelRideModal] = useState(false);


  useEffect(() => {
    axios.get('/api/riders/rides')
      .then(res => {
        console.log('🦨', res.data)
        setNearbyRides(res.data);
        console.log(nearbyRides)
      })
      .catch(err => {
        console.log('err in back to client', err);
      })
      // eslint-disable-next-line
  }, []);

  const handleSelectRide = e => {
    const ride = e.target.attributes.ride.nodeValue;
    // use ride to call db for full ride data / time / riderName
    setRideSelected(true);
    console.log(ride);
  }

  const handleConfirmationPageBtnPress = e => {
    const value = e.target.innerText;
    if (value === 'Confirm') {
      setRideConfirmed(true);
      setShowConfirmationModal(true);
    } else {
      setRideSelected(false);
    }
  }

  const handleConfirmationOKPress = () => {
    setShowConfirmationModal(false);
  }

  const handlePostConfirmationCanellationBtnPress = e => {
    setShowCancelRideModal(true);
  }

  const handleRideCancellation = () => {
    setShowCancelRideModal(false);
    setRideSelected(false);
    setRideConfirmed(false);
    // removes rideid from db
  }

  const riderConfirmationModal = (
    <div id="riderConfirmationModal" className="riderModal">
      <span>Ride Confirmed!</span>
      <span>Your driver has been notified.</span>
      <button className="riderBtn" onClick={handleConfirmationOKPress}>Ok</button>
    </div>
  );

  const cancelRideModal = (
    <div id="riderCancelRideModal" className="riderModal">
      <span>Are you sure you want to cancel?</span>
      <button className="riderBtn cancelRideBtn" onClick={handleRideCancellation}>Yes</button>
      <button className="riderBtn" onClick={() => { setShowCancelRideModal(false); }}>No</button>
    </div>
  );



  return (
    <div>
      {showConfirmationModal ? riderConfirmationModal : null}
      {showCancelRideModal ? cancelRideModal : null}
      <button onClick={props.riderHandle}>BACK</button>
      <MapContainer nearbyRides={nearbyRides} riderLocation={riderLocation} />
      {!rideSelected ? 
      <RideList nearbyRides={nearbyRides} handleSelectRide={handleSelectRide} /> :
      <SelectedRide 
      ride={nearbyRides[0]} 
      handleConfirmationPageBtnPress={handleConfirmationPageBtnPress} 
      handlePostConfirmationCanellationBtnPress={handlePostConfirmationCanellationBtnPress}
      rideConfirmed={rideConfirmed} />
      }

    </div>
  );
};

export default Rider;