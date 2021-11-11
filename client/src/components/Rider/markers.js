import { Icon } from '@iconify/react';
import './Map.scss';

const StartMarker = ({ lat, lng, onClick }) => {
    return (
        <div className="start-marker" onClick={onClick}>
            <Icon icon="ri:leaf-fill" className="start-icon icon" />           
        </div>
    );
};

const EndMarker = ({ lat, lng }) => {
    return (
        <div className="end-marker">
            <Icon icon="ri:leaf-fill" className="end-icon icon" />          
        </div>
    );
};

const RiderLocation = ({ lat, lng }) => {
    return (
        <div className="location-marker">
            <Icon icon="gis:point" className="location-icon icon" />         
        </div>
    );
};

export { StartMarker, RiderLocation, EndMarker };