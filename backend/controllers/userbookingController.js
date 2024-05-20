const PropertyBooking = require('../models/HouseBooking');
const RentBooking = require('../models/RentBooking');
const Document = require('../models/Document');
const stripe = require('stripe')('sk_test_51MUpeXElxw6z6SBSpqVGFwh5dYGiEXTBCsaGHYiiCFmyaVUzNddqnlfeFV4TeL5UNQ8ZKjosJ86LDNuCLN4FmjNv00rlNvXdhr');
const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'frontend', 'public', 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

exports.createDocument = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err); // Log Multer error
      return res.status(500).json({ success: false, message: 'Error uploading image' });
    }


    console.log('Incoming request body:', req.body);

    try {
      const { user_id  } = req.body;
      const image = req.file ? req.file.filename : null; // Get filename if file was uploaded

      console.log(image);
      const galleryEntry = new Document({
        user_id,
        image: image, // Store the file path in the database
      });

      await galleryEntry.save();

      res.status(201).json({ success: true, data: galleryEntry });
    } catch (error) {
      console.error('Database Error:', error);
      next(error); // Pass error to the error handler
    }
  });
};

// Fetch all documents from the database
exports.getAllDocuments = async (req, res, next) => {
  try {
    // Retrieve all documents from the database
    const documents = await Document.find(); // Fetches all documents, regardless of user_id

    res.status(200).json({ success: true, data: documents }); // Return the list of documents to the client
  } catch (error) {
    console.error('Database Error:', error); // Log the error for debugging
    return res.status(500).json({ success: false, message: 'Database error' }); // Return a 500 error if something goes wrong
  }
};


exports.createPropertyBooking = async (req, res, next) => {
  try {
    // Log form data in console
    console.log('Form Data:', req.body);

    const { user_id, property_id,price, payment, token } = req.body;

    // Check if all required fields are present
    if (!user_id || !property_id || !payment || !price || !token) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const finalPaymentStatus = 'paid';

    
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: price * 100,
      customer: customer.id,
      description: "Property Payment",
      currency: "USD",

      receipt_email: token.email,
    });

    // Check if charge was successful
    if (charge.status !== 'succeeded') {
      return res.status(400).json({ success: false, error: 'Payment failed' });
    }

    // Create the property booking instance
    const propertyBooking = new PropertyBooking({ user_id, property_id, payment:finalPaymentStatus });

    // Save the property booking instance to the database
    await propertyBooking.save();

    res.status(201).json({ success: true, data: propertyBooking });
  } catch (error) {
    console.error('Payment Error:', error); // Log payment error
    next(error);
  }
};

exports.createRentBooking = async (req, res, next) => {
  try {
    // Log form data in console
    console.log('Form Data:', req.body);

    const { user_id, rent_id, price, payment, token } = req.body;

    // Check if all required fields are present
    if (!user_id || !rent_id || !price || !payment || !token) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const finalPaymentStatus = 'paid';

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: price * 100,
      customer: customer.id,
      description: "Rental Payment",
      currency: "USD",
      receipt_email: token.email,
    });

    // Check if charge was successful
    if (charge.status !== 'succeeded') {
      return res.status(400).json({ success: false, error: 'Payment failed' });
    }

    // Create the rent booking instance
    const rentBooking = new RentBooking({ user_id, rent_id, payment: finalPaymentStatus });

    // Save the rent booking instance to the database
    await rentBooking.save();

    res.status(201).json({ success: true, data: rentBooking });
  } catch (error) {
    console.error('Payment Error:', error); // Log payment error
    next(error);
  }
};




exports.getPropertyBookingsByUser = async (req, res) => {
    const userId = req.params.userId; // Get the user ID from the request parameters
  
    try {
      // Query the database for hotel bookings with the provided user ID
      const propertyBookings = await PropertyBooking.find({ user_id: userId });
  
      // Return the list of hotel bookings as JSON response
      res.json(propertyBookings);
    } catch (error) {
      // Handle errors
      console.error('Error fetching property bookings:', error);
      res.status(500).json({ error: 'Failed to fetch property bookings' });
    }
  };

  exports.getAdminRentBookings = async (req, res) => {
    try {
      const rentBooking = await RentBooking.find();
      res.status(200).json({ success: true, rentBooking });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  exports.getAdminPropertyBookings = async (req, res) => {
    try {
      const propertyBooking = await PropertyBooking.find();
      res.status(200).json({ success: true, propertyBooking });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  
  exports.getRentBookingsByUser = async (req, res) => {
    const userId = req.params.userId; // Get the user ID from the request parameters
  
    try {
      // Query the database for hotel bookings with the provided user ID
      const rentBookings = await RentBooking.find({ user_id: userId });
  
      // Return the list of hotel bookings as JSON response
      res.json(rentBookings);
    } catch (error) {
      // Handle errors
      console.error('Error fetching rent bookings:', error);
      res.status(500).json({ error: 'Failed to fetch rent bookings' });
    }
  };