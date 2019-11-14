# Chef'd

Chef'd is an app which people can use as a weekly Meal planner

[View website](https://chefd-meal-planner.herokuapp.com)

Who is this app for: Anyone who wants to make use of what they have in their pantry 

Why would someone use this app: Use what you have in your pantry, Spend less, Save

What makes this app different from other apps: ??

## Overview

 *  A user is able to not only find recipes but plan what he wants to eat for the week 	  
    
 *  The app is developed as a full-stack web application created with MongoDb, Express.js, React, Node  
 
       * Used Express to manage the server and routes.
       * Used Node and Mongoose to create, query, update and delete routed data in the app.
       * Used bcryptjs npm package to hash passwords.
       * Used Json WebTokens for user authentication.
       * Used cheerio and axios to scrape recipes from Serious Eats.
       * Used eslint for linting which analyse the code for potential errors.
       * Used GSAP to design animations
       * Used Travis-CI for Continuous Integration (CI) which automate the build and testing of code
          every time a team member commits changes to version control.
    
## Instructions
### App Setup
Chef'd app can be installed as follows
  1. Clone the repository
  2. npm install
  3. npm start

`npm start` runs the app in development mode and opens the browser at http://localhost:3000 to view it in the browser.


### DB Setup
1. Register the user using the main page using register option

 
### Model setup
1.	create a folder named models.
2.	In models, make  the following files: 
      *  Index.js: Create an index.js file  
      *  Profile.js :  Create Profile Schema using Mongoose
      *  RecipeExternal.js: Create RecipeExternal Schema to store recipes using Mongoose
      *  User.js:  Create User Schema using Mongoose, Bcryptjs, Jsonwebtoken
  
### Routes setup
1. Create a folder named  routes.  
2. In routes, make  the following files: 
      *  apiRoutes.js: create different routes which are required for the app.
      *  authRoutes.js: Authenticate a user to register, login, logout   
         Use bcryptjs to compare password sent with the hash stored in the database.

 
  
### Contributors
   ##### Dan Proctor
   ##### Rizwan Renesa
   ##### Giri Rao
  
 
