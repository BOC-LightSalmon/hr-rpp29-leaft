import React from 'react';
import date from 'date-and-time';
import ordinal from 'date-and-time/plugin/ordinal';
import meridiem from 'date-and-time/plugin/meridiem';
import locationIcon from './location.svg';

date.plugin(ordinal);
date.plugin(meridiem);

const RideList = props => {

    const nearbyRides = props.nearbyRides.map((ride, key) => {
        let unformattedDate = new Date(`${ride.date} ${ride.departure}`);
        let formattedDateTime = date.format(unformattedDate, 'dddd, MMM DDD hh:mm a');

        return (
            <div className="listItem" onClick={() => props.handleSelectRide(key)} key={key}>
                <img className="locationIcon" src={locationIcon} alt="location icon"></img>
                <div className="destinationDetails">
                    <span className="destinationListName">{ride.dropOff}</span>
                    <span className="destinationListPickupDetails">Pick up : {formattedDateTime}</span>
                </div>
            </div>
        )
    });

    return (
        <div className="RideList RiderBtmPanel">
            <div id="greetingContainer">
                <span id="greetingContainerGreeting">Nice to see you!</span>
                <span id="greetingContainerQuestion">Where are you going?</span>
            </div>
            <div id="list">
                {nearbyRides}
            </div>
        </div>
    );
}

export default RideList;