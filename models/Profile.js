const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  pantry: {
    type: Array,
    default: []
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "RecipeExternal", default: [] }],
  
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    required:true

  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;