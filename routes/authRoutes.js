const express = require('express');
const db = require("../models");
const auth = require('../middleware/auth')

module.exports = app => {
 
  app.post('/users/register', async(req,res) => {
    const user = new db.User(req.body)
    
    try {
      const profile = new db.Profile({owner: user._id});
      console.log(profile._id)

      user.profile = profile._id;
      console.log(user)
      await user.save();
      await profile.save();
      const token = await user.generateAuthToken();
      return res.status(201).send({user,token})

    } catch (e) {
      console.log(e)
       return  res.status(400).send(e)
  }
});

 app.post('/users/login', async (req, res) => {
    try{
      const user = await db.User.findOne({email: req.body.email}).populate("profile")
      const token = await user.generateAuthToken()
      console.log(token)

      res.status(200).send({user,token});
    }catch(e){
      console.log(e)
      res.status(400).send(e)

    }
  })
 
  
//logout
  app.post('/users/logout', auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()
      res.send()
    } catch (e) {
      res.status(500).send()
    }
  })

  

  //this is the user's profile
  app.get('/users/me', auth, async (req, res) => {
    //user profile
    res.send(req.user)
  })
 


}


