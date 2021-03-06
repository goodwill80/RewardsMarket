var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CartSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  total: { type: Number, default: 0},
  totalPoints: { type: Number, default: 0},
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number, default: 1},
    price: {type: Number, default: 0},
    points: {type: Number, default: 0}
  }]
});

mongoose.model('Cart', CartSchema);
