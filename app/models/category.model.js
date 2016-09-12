var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true
  }
});

mongoose.model('Category', CategorySchema);
