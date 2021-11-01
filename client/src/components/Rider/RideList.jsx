import React, { useState, useEffect } from 'react';
import date from 'date-and-time';
import ordinal from 'date-and-time/plugin/ordinal';
import meridiem from 'date-and-time/plugin/meridiem';
import locationIcon from '../../location.svg';
date.plugin(ordinal);
date.plugin(meridiem);

const RideList = props => {

    const nearbyRides = props.nearbyRides.map(ride => {
        let unformattedDate = new Date(ride.date);
        let formattedDate = date.format(unformattedDate, 'dddd, MMM DDD hh:mm a');
        return (
            <div className="listItem" onClick={props.handleSelectRide} key={ride.id} ride={ride.id}>
                <img className="locationIcon" src={locationIcon} alt="location icon" ride={ride.id}></img>
                <div className="destinationDetails" ride={ride}>
                    <span className="destinationListName" ride={ride}>{ride.end}</span>
                    <span className="destinationListPickupDetails" ride={ride.id} >Pick up : {formattedDate}</span>
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