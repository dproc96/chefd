import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getAllRecipes: function () {
    return axios.get("/api/recipes/external");
  },
    getWeeklyRecipes: function () {
    return axios.get("/api/recipes/week");
  }
}
