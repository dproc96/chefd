import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <div className="searchform  input-group mb-3">
      <input type="text" className="form-control" placeholder="Search recipes by title" onChange={props.handleInputChange} />
      <div className="input-group-append" >
        <button className="btn btn-outline-secondary" type="button" onClick={props.handleSubmitButton}>Search</button>
      </div>
    </div>
  );
}

export default SearchForm;