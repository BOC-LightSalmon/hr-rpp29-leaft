require('dotenv').config();
const Route = require('../../db/models/routes');
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
  
  try {
    const nearbyRoutes = await Route.findAll({
      where: {
        [Op.and]: [{latPickUp: {[Op.between]: [minLat, maxLat]}}, {lngPickUp: {[Op.between]: [minLng, maxLng]}}]
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
    {rider_id: req.body.riderId},
    {id: req.body.routeId}
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
    {rider_id: null},
    {id: req.body.routeId}
  )
  .then(result => {
    console.log(result);
    res.status(200)
  })
  .catch(err => {
    res.status(400);
  })
}

module.exports = {
  // insert function names here
  selectRoute,
  findNearbyRoutes,
  addRiderToRoute,
  removeRiderFromRoute
};