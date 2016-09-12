var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId, ref: 'Category'
  },
  name: String,
  price: Number,
  points: Number,
  description: String,
  image: String
});

mongoose.model('Product', ProductSchema);
