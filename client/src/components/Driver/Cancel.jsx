import './notification.scss'

const Cancel = (props) => {
  const driverName = props.driverName;
  const riderName = props.notificationData.riderName;
  return (
    <div id='notification'>
      <h2>Rider Cancelled</h2>
      <div>Hi {driverName}</div>
      <div>
      {riderName} has cancelled. Your ride has become available for another rider to join.
      </div>
      <button onClick={props.handleCancellation}>Ok</button>
    </div >
  )
}

export default Cancel;