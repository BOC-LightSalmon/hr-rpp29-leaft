import React from 'react';

const SelectedRide = props => {
    console.log('🌺', props);
    return (
        <div className={"RiderBtmPanel"} id="SelectedRide">
            <div id="confirmationPage">
                <span id="confirmationPageHeader">{!props.rideConfirmed ? 'Here are the ride\'s details:' : 'Ride details:'}</span>
                <ul id="fullRideDetails">
                    <li><span className="rideDetail">Pick up time: </span>{props.ride.date ? props.ride.date: 'Tuesday, Nov 18th at 9am'}</li>
                    <li><span className="rideDetail">Pick up location: </span>{props.ride.pickUp}</li>
                    <li><span className="rideDetail">Drop off location: </span>{props.ride.dropOff}</li>
                    <li><span className="rideDetail">Driver's Name: </span>{props.ride.driver ? props.ride.driver: 'Nate'}</li>
                </ul>
            </div>
            {!props.rideConfirmed ?
                <div className="btnsContainer">
                    <button id="CancelConfirmationBtn" className="pageBtn cancelRideBtn" onClick={props.handleConfirmationPageBtnPress}>Cancel</button>
                    <button id="confirmRideBtn" className="riderBtn pageBtn" onClick={props.handleConfirmationPageBtnPress}>Confirm</button>
                </div> :
                <div className="btnsContainer">
                    <button className="pageBtn cancelRideBtn" onClick={props.handlePostConfirmationCanellationBtnPress}>Cancel</button>
                    <button id="tipDriverBtn" className="riderBtn pageBtn">Tip Driver</button>
                </div>
            }
        </div>
    );
}

export default SelectedRide; 