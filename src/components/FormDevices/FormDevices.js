import React from 'react';
import "../../pages/AdminUsers/AdminUsers.css"

export const FormDevices = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input className="form-control" id="description" placeholder='Description'/>
      </div>
      <div className="form-group">
        <label htmlFor="text">Street</label>
        <input
          type="text"
          className="form-control"
          id="street"
          placeholder="Street"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          placeholder="City"
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          placeholder="Country"
        />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          placeholder="Postal Code"
        />
      </div>
      <div className="form-group">
        <label htmlFor="maximumHourlyEnergyConsumption">Hourly Consumption</label>
        <input
          type="text"
          className="form-control"
          id="maximumHourlyEnergyConsumption"
          placeholder="Hourly Consumption"
        />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default FormDevices;
