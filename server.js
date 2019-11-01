const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const db = require("./models");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chefd";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

require("./routes/apiRoutes")(app);

const root = path.join(__dirname, "client", "build");
app.use(express.static(root));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT, () => {
  // db.RecipeExternal.drop();
  
  // require("./utils/scraper").scrapeSeriousEats();
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});