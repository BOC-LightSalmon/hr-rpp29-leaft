import React, { useEffect, useState } from 'react';
import MapContainer from './MapContainer';
import './RideBtmPanel.scss';
import RideList from './RideList';
import SelectedRide from './SelectedRide';
import axios from 'axios';

const Rider = (props) => {
  // eslint-disable-next-line
  const [riderLocation, setRiderLocation] = useState({ lat: 40.7580, lng: -73.9855 });
  const [nearbyRides, setNearbyRides] = useState([]); // this will be an array with all the columns (or not) of the Routes table, it will have all the info including pick up and dropoff locations, times where the riderLocation is equal to Ride.zip
  const [rideSelected, setRideSelected] = useState(false);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelRideModal, setShowCancelRideModal] = useState(false);
  const [userid, setUserid] = useState('');
  const [reRender, setReRender] = useState(false);
  // eslint-disable-next-line
  const [markerClicked, setMarkerClicked] = useState(false);
  const [whichMarkerClicked, setWhichMarkerClicked] = useState(null);
  const [whichListItemClicked, setWhichListItemClicked] = useState(null);


  useEffect(() => {
    axios.get('/api/riders/rides', { 
      params: {
        riderLocation: riderLocation
      } 
      }).then(res => {
        console.log('🦨', res.data)
        setNearbyRides(res.data);
        //console.log(nearbyRides)
      })
      .catch(err => {
        console.log('err in back to client', err);
      })
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(props.userid);
    setUserid(setUserid);
  }, [props.userid]);


  const associateRiderWithRide = (routeId, riderId) => {
    axios.put('/api/riders/rides/associateRider', { routeId, userid })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('err in back to client', err);
      })
  }

  const handleMarkerClick = (key) => {
    setMarkerClicked(true);
    setReRender(!reRender);
    setWhichMarkerClicked(key);

    setRideSelected(true);
  }


  const handleSelectRide = key => {
    setRideSelected(true);
    setWhichListItemClicked(key);
    setWhichMarkerClicked(key);
    setMarkerClicked(true);
    setReRender(!reRender);
  }

  const handleConfirmationPageBtnPress = e => {
    const value = e.target.innerText;
    if (value === 'Confirm') {
      associateRiderWithRide(whichListItemClicked, userid)
      setRideConfirmed(true);
      setShowConfirmationModal(true);
      // need to put riderid on route row
    } else {
      setRideSelected(false);
      setMarkerClicked(false);
      setWhichMarkerClicked(null);
      setReRender(!reRender);
      // map needs to go back to route departure view
    }
  }

  // removes ride confirmation modal view
  const handleConfirmationOKPress = () => {
    setShowConfirmationModal(false);
  }

  // opens 'Are you sure?' modal
  const handlePostConfirmationCanellationBtnPress = e => {
    setShowCancelRideModal(true);
  }

  // needs to remove riderid from route
  const handleRideCancellation = () => {
    setShowCancelRideModal(false);
    setRideSelected(false);
    setRideConfirmed(false);
    // removes rideid from db

    setMarkerClicked(false);
    setWhichMarkerClicked(false);
    setReRender(!reRender);
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
      {/* <button onClick={props.riderHandle}>BACK</button> */}
      <i onClick={props.riderHandle} className="arrow left"></i>
      <MapContainer nearbyRides={nearbyRides} riderLocation={riderLocation} reRender={reRender} markerClicked={markerClicked} whichMarkerClicked={whichMarkerClicked} whichListItemClicked={whichListItemClicked} handleMarkerClick={handleMarkerClick} rideSelected={rideSelected} />
      {!rideSelected ?
      <RideList nearbyRides={nearbyRides} handleSelectRide={handleSelectRide} /> :
      <SelectedRide
      ride={nearbyRides[whichMarkerClicked] ? nearbyRides[whichMarkerClicked] : nearbyRides[whichListItemClicked]}
      handleConfirmationPageBtnPress={handleConfirmationPageBtnPress}
      handlePostConfirmationCanellationBtnPress={handlePostConfirmationCanellationBtnPress}
      rideConfirmed={rideConfirmed} />
      }

    </div>
  );
};

export default Rider;