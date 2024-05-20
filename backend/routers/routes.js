// backend/routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const propertyController = require('../controllers/propertyController');
const rentController = require('../controllers/rentController');
const userbookingController = require('../controllers/userbookingController');


// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', userController.getUser);
router.get('/edit/users/:id', userController.getUserById);
router.put('/update/users/:id', userController.updateUser);
router.delete('/delete/users/:id', userController.deleteUser);



// house

router.post('/create/property', propertyController.createHouse);
router.get('/get/property', propertyController.getAllHouses);
router.get('/edit/property/:houseId', propertyController.getHouseById);
router.put('/update/property/:houseId', propertyController.updateHouseById);
router.delete('/delete/property/:houseId', propertyController.deleteHouseById);


// rent

router.post('/create/rent', rentController.createRent);
router.get('/get/rent', rentController.getAllRents);
router.get('/edit/rent/:rentId', rentController.getRentById);
router.put('/update/rent/:rentId', rentController.updateRentById);
router.delete('/delete/rent/:rentId', rentController.deleteRentById);


router.post('/propertyBooking', userbookingController.createPropertyBooking);
router.post('/rentbooking', userbookingController.createRentBooking);





router.get('/admin/propertybookings/', userbookingController.getAdminPropertyBookings);
router.get('/admin/rentbookings/', userbookingController.getAdminRentBookings);



router.get('/user/propertybookings/:userId', userbookingController.getPropertyBookingsByUser);
router.get('/user/rentbookings/:userId', userbookingController.getRentBookingsByUser);

router.post('/user/document/:userId', userbookingController.createDocument);
router.get('/admin/document/', userbookingController.getAllDocuments);


module.exports = router;
