import React from 'react';
import "../../pages/AdminUsers/AdminUsers.css"

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Pasword"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Role</label>
        <input
          type="text"
          className="form-control"
          id="role"
          placeholder="Role"
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
export default Form;
