import React, { useState } from "react";
import PropTypes from "prop-types";

export const StoreSecret = ({ addSecret, secretList }) => {
  const [secret, setSecret] = useState("");
  const [expireAfter, setExpireAfter] = useState("");

  const submitSecret = (e) => {
    e.preventDefault();
    addSecret(secret, expireAfter);
    setSecret("");
    setExpireAfter("");
  };

  return (
    <>
      <div className="title">
        <h3>Type in and submit secret</h3>
        <p>make sure to refresh before submitting another secret</p>
      </div>
      <form
        onSubmit={submitSecret}
        className="form-container  align-items-center">
        <div className="form-container_form col-md-12 col-sm-12 col-lg-12 col-11 d-flex">
          <input
            type="text"
            placeholder="Type in your secret"
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            placeholder="Expire time in seconds"
            onChange={(e) => setExpireAfter(e.target.value)}
          />
          <button type="submit">submit</button>
        </div>
      </form>
      <div className="display mt-3">
        <p>
          This is your hash: <span>{secretList}</span>{" "}
        </p>
      </div>
      <div className="borderLine"></div>
    </>
  );
};

// StoreSecret.propTypes = {
//   addSecret: PropTypes.func.isRequired,
//   secretList: PropTypes.string.isRequired,
// };
