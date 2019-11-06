const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  pantry: {
    type: Array
  },
  favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "RecipeExternal" }],
  
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    required:true

  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;