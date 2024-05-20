const House = require('../models/House');
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

exports.createHouse = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err); // Log Multer error
      return res.status(500).json({ success: false, message: 'Error uploading image' });
    }

    try {
      const { name, location, rating, description, price } = req.body;
      const image = req.file ? req.file.filename : null; // Get filename if file was uploaded

      // Create the house instance
      const house = new House({ name, location, rating, description, price, image });

      // Save the house instance to the database
      await house.save();

      res.status(201).json({ success: true, house });
    } catch (error) {
      console.error('Database Error:', error); // Log database error
      next(error);
    }
  });
};

exports.getAllHouses = async (req, res, next) => {
    try {
      const houses = await House.find();
      res.status(200).json({ success: true, houses });
    } catch (error) {
      console.error(error);
      next(error);
    }
};

exports.getHouseById = async (req, res, next) => {
    const { houseId } = req.params;
  
    try {
      const house = await House.findById(houseId);
  
      if (!house) {
        return res.status(404).json({ success: false, message: 'House not found' });
      }
  
      res.status(200).json({ success: true, house });
    } catch (error) {
      console.error(error);
      next(error);
    }
};

exports.updateHouseById = async (req, res, next) => {
    const { houseId } = req.params;
  
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

            // Construct updated house object
            const updatedHouse = {
                name,
                location,
                rating,
                description,
                image
            };

            // If image is uploaded, add it to the updated house object
            if (image) {
                updatedHouse.image = image;
            }

            // Update the house in the database
            const house = await House.findByIdAndUpdate(houseId, updatedHouse, { new: true });

            if (!house) {
                return res.status(404).json({ success: false, message: 'House not found' });
            }

            // Return the updated house object in the response
            res.status(200).json({ success: true, house });
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


exports.deleteHouseById = async (req, res, next) => {
    const { houseId } = req.params;
  
    try {
      const house = await House.findByIdAndDelete(houseId);
  
      if (!house) {
        return res.status(404).json({ success: false, message: 'House not found' });
      }
  
      res.status(200).json({ success: true, message: 'House deleted successfully' });
    } catch (error) {
      console.error(error);
      next(error);
    }
};
