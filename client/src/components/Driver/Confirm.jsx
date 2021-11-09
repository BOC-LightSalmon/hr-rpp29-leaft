import './notification.scss';

const Confirm = (props) => {
  const { pickUp, dropOff, departure } = props.notificationData.route;
  const riderName = props.notificationData.riderName;
  const driverName = `${props.userData.first_name} ${props.userData.last_name}`;

  return (
    <div id="notification">
      <h2>Confirmation</h2>
      <div>Hi <strong> {driverName} </strong></div>
      <div>
        <strong> {riderName} </strong> has chosen one of your routes! Please meet them at Pick-Up Location by Departure Time.
      </div>
      <div><strong>Pick-Up Location: </strong> {pickUp}</div>
      <div><strong>Drop-Off Location: </strong> {dropOff}</div>
      <div><strong>Departure Time: </strong> {departure}</div>

      <button onClick={props.handleConfirmation}>Confirm Ride</button>
    </div>
  );
};

export default Confirm;