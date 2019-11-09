const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }
});


UserSchema.methods.generateAuthToken = async function(){
  const user = this;
  const token = jwt.sign({_id:user._id.toString()}, 'bestteam');
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token

}

UserSchema.statics.findByCredentials=async (email, password)=>{
  const user = await User.findOne({email})

  if (!user){
    throw new Error('Unable to login')
  }
  const isMatch = await bcrypt.compareSync(password, user.password)

  if (!isMatch){
    throw new Error('Unable to login')
  }
// if the username and password match returns the user
  return user
}


//Hash the plain text password
UserSchema.pre('save', async function(next){
  const user = this;
  //this is where we re hashing the password
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)
  }
  next()
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
