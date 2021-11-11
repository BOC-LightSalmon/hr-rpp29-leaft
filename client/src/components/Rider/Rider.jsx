import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import MapContainer from './MapContainer';
import './RideBtmPanel.scss';
import RideList from './RideList';
import SelectedRide from './SelectedRide';
import { AuthContext } from '../../App';
import axios from 'axios';

const Rider = (props) => {
  // eslint-disable-next-line
  const [riderLocation, setRiderLocation] = useState({ lat: 40.7580, lng: -73.9855 });
  const [nearbyRides, setNearbyRides] = useState([]);
  const [rideSelected, setRideSelected] = useState(false);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelRideModal, setShowCancelRideModal] = useState(false);
  const [reRender, setReRender] = useState(false);
  // eslint-disable-next-line
  const [markerClicked, setMarkerClicked] = useState(false);
  const [whichMarkerClicked, setWhichMarkerClicked] = useState(null);
  const [whichListItemClicked, setWhichListItemClicked] = useState(null);
  const [confirmedRide, setConfirmedRide] = useState({});

  const userData = useContext(AuthContext);
  
  useEffect(() => {
    axios.get('/api/riders/rides', {
      params: {
        riderLocation: riderLocation,
        userId: userData.id
      }
      }).then(res => {
        setNearbyRides(res.data);
        const confirmed = res.data.filter(ride => ride.rider_id === userData.id);
        if (confirmed.length > 0) {
          setConfirmedRide(confirmed[0]); 
          setRideConfirmed(true);
        } 
      })
      .catch(err => {
        console.log('err in back to client', err);
      })
    // eslint-disable-next-line
  }, []);

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
      const routeId = (nearbyRides[whichMarkerClicked]) ? nearbyRides[whichMarkerClicked].id : confirmedRide.id;
      const riderId = userData.id;
      //need to change to login rider id and name
      axios.put('/api/riders/confirm', { id: routeId, riderId: riderId, riderName: userData.first_name })
        .then(() => {
          setRideConfirmed(true);
          setShowConfirmationModal(true);
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setRideSelected(false);
      setMarkerClicked(false);
      setWhichMarkerClicked(null);
      setReRender(!reRender);
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
    const riderName = userData.first_name + ' ' + userData.last_name;
    // const routeId = nearbyRides[whichListItemClicked].id;
    const routeId = (nearbyRides[whichMarkerClicked]) ? nearbyRides[whichMarkerClicked].id : confirmedRide.id;
    axios.put('/api/riders/cancel', { id: routeId, riderName: userData.first_name })
      .then(() => {
        setShowCancelRideModal(false);
        setRideSelected(false);
        setRideConfirmed(false);
        // removes rideid from db

        setMarkerClicked(false);
        setWhichMarkerClicked(false);
        setReRender(!reRender);
      })
      .catch(err => {
        console.log(err)
      })

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
      <Navbar />
      {showConfirmationModal ? riderConfirmationModal : null}

      {showCancelRideModal ? cancelRideModal : null}

      <MapContainer nearbyRides={nearbyRides} riderLocation={riderLocation} reRender={reRender} markerClicked={markerClicked} whichMarkerClicked={whichMarkerClicked} handleMarkerClick={handleMarkerClick} rideConfirmed={rideConfirmed} confirmedRide={confirmedRide} />

      {!rideSelected && !rideConfirmed ?
      <RideList nearbyRides={nearbyRides} handleSelectRide={handleSelectRide} /> :
      <SelectedRide
      ride={(whichListItemClicked !== null || whichMarkerClicked !== null) ? (nearbyRides[whichMarkerClicked] ? nearbyRides[whichMarkerClicked] : nearbyRides[whichListItemClicked]) : confirmedRide}
      handleConfirmationPageBtnPress={handleConfirmationPageBtnPress}
      handlePostConfirmationCanellationBtnPress={handlePostConfirmationCanellationBtnPress}
      rideConfirmed={rideConfirmed} />
      }

    </div>
  );
};

export default Rider;