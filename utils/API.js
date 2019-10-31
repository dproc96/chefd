const axios = require("axios");

const API = {
  authentication: "&app_id=75d5ecea&app_key=3602ca08ee5058025112cdc248cd1ced",
  getRecipes(parameters) {
    return new Promise((resolve, reject) => {
      let params = "";
      for (let key in parameters) {
        if (params) {
          params += "&";
        }
        params += `${key}=${parameters[key]}`;
      }
      axios.get(`https://api.edamam.com/search?${params + this.authentication}`)
        .then(results => {
          let recipes = results.data.hits;
          resolve(recipes);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};


module.exports = API;