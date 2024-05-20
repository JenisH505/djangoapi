const Rent = require('../models/Rent');
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

exports.createRent = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err); // Log Multer error
      return res.status(500).json({ success: false, message: 'Error uploading image' });
    }

    try {
      const { name, location, rating, description, price } = req.body;
      const image = req.file ? req.file.filename : null; // Get filename if file was uploaded

      // Create the rent instance
      const rent = new Rent({ name, location, rating, description, price, image });

      // Save the rent instance to the database
      await rent.save();

      res.status(201).json({ success: true, rent });
    } catch (error) {
      console.error('Database Error:', error); // Log database error
      next(error);
    }
  });
};

exports.getAllRents = async (req, res, next) => {
    try {
      const rents = await Rent.find();
      res.status(200).json({ success: true, rents });
    } catch (error) {
      console.error(error);
      next(error);
    }
};

exports.getRentById = async (req, res, next) => {
    const { rentId } = req.params;
  
    try {
      const rent = await Rent.findById(rentId);
  
      if (!rent) {
        return res.status(404).json({ success: false, message: 'Rent not found' });
      }
  
      res.status(200).json({ success: true, rent });
    } catch (error) {
      console.error(error);
      next(error);
    }
};

exports.updateRentById = async (req, res, next) => {
    const { rentId } = req.params;
  
    try {
      // First, handle file upload using multer
      upload(req, res, async (err) => {
        if (err) {
          console.error('Multer Error:', err);
          return res.status(500).json({ success: false, message: 'Error uploading image' });
        }
        
        // Extract other fields from the request body
        const { name, location, rating, description } = req.body;
        const image = req.file ? req.file.filename : null;
  
        // Construct updated rent object
        const updatedRent = {
          name,
          location,
          rating,
          description,
          image
        };
  
        // Update the rent in the database
        const rent = await Rent.findByIdAndUpdate(rentId, updatedRent, { new: true });
  
        if (!rent) {
          return res.status(404).json({ success: false, message: 'Rent not found' });
        }
  
        // Return the updated rent object in the response
        res.status(200).json({ success: true, rent });
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
exports.deleteRentById = async (req, res, next) => {
    const { rentId } = req.params;
  
    try {
      const rent = await Rent.findByIdAndDelete(rentId);
  
      if (!rent) {
        return res.status(404).json({ success: false, message: 'Rent not found' });
      }
  
      res.status(200).json({ success: true, message: 'Rent deleted successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
};
