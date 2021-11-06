require('dotenv').config();
const Routes = require('../../db/models/routes');
const Users = require('../../db/models/users');
const { Op } = require('sequelize');

const selectRoute = async (req, res) => {
  // write function to interact with database
}

// define more controllers for driver actions
const findNearbyRoutes = async (req, res) => {
  const minLat = JSON.parse(req.query.riderLocation).lat - .35;
  const maxLat = JSON.parse(req.query.riderLocation).lat + .35;
  const minLng = JSON.parse(req.query.riderLocation).lng - .35;
  const maxLng = JSON.parse(req.query.riderLocation).lng + .35;
  const userId = JSON.parse(req.query.userId);
  console.log(`UserId: ${userId} is ${typeof userId}`);

  try {
    const nearbyRoutes = await Routes.findAll({
      where: {
        driver_id: { [Op.not]: userId},
        rider_id: { [Op.eq]: null},
        latPickUp: { [Op.between]: [minLat, maxLat] },
        lngPickUp: { [Op.between]: [minLng, maxLng] }
      },
      include: [
        {
          model: Users,
          as: 'driver',
          where: {},
          attributes: ['first_name']
        }
      ]
    });

    res.status(200).send(nearbyRoutes);
  } catch (err) {
    res.status(400).send(err);
  }
}



const addRiderToRoute = async (req, res) => {
  console.log(req.body);
  Routes.update(
    { rider_id: req.body.riderId },
    { id: req.body.routeId }
  )
    .then(result => {
      console.log(result);
      res.status(200)
    })
    .catch(err => {
      res.status(400);
    })
}

const removeRiderFromRoute = async (req, res) => {
  Routes.update(
    { rider_id: null },
    { id: req.body.routeId }
  )
    .then(result => {
      console.log(result);
      res.status(200)
    })
    .catch(err => {
      res.status(400);
    })
}

const confirmRoute = async (req, res) => {
  const socket = req.app.get('socket')
  try {
    await Routes.update({rider_id: req.body.riderId}, {where: {id: req.body.id}})

    const route = await Routes.findOne({
      where: { id: req.body.id },
      attributes: ['driver_id', 'rider_id', 'pickUp', 'dropOff', 'departure']
    })
 
    socket.emit(
      'confirmRoute',
      { route: route, riderName: req.body.riderName }
    )

    res.sendStatus(201);
  } catch (err) {
    res.status(204).send(err);
  }
}

const cancelRoute = async (req, res) => {
  const socket = req.app.get('socket')
  try {
    await Routes.update({rider_id: null}, {where: { id: req.body.id }})
    const route = await Routes.findOne({
      where: { id: req.body.id},
      attributes: ['driver_id'],
      raw: true
    })
 
    
    socket.emit(
      'cancelRoute',
      { driverId: driverId, riderName: req.body.riderName }
    )
    res.sendStatus(201);
  } catch (err) {
    res.status(204).send(err);
  }
}



module.exports = {
  // insert function names here
  selectRoute,
  findNearbyRoutes,
  addRiderToRoute,
  removeRiderFromRoute,
  confirmRoute,
  cancelRoute
};