const mongoose = require('mongoose'); 
const documentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },

}, { timestamps: true }); 
const Document = mongoose.model('Document', documentSchema);

module.exports = Document; 
