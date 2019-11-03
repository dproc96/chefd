
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favourite: {
	type: Schema.Types.ObjectId,
    ref: "RecipeExternal"
  },
  diet_restriction: {
    type: String,
    required: false
  },
  register_date: {
    type: Date
}

});

module.exports = User = mongoose.model('user', UserSchema);
