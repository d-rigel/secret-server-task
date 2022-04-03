import React, { useState } from "react";
// import PropTypes from "prop-types";

export const GetSecret = ({ getSecret, newSecret }) => {
  const [hash, setHash] = useState("");

  const retrieveSecret = (e) => {
    e.preventDefault();
    getSecret(hash);
    setHash();
  };
  return (
    <div>
      <>
        <div className="title">
          <h3>Type in and submit your hash</h3>
          <p>NB: Hash not valid after expire time! </p>
        </div>
        <div className="form-container2  align-items-center">
          <form
            onSubmit={retrieveSecret}
            className="form-container_form2 col-md-12 col-sm-12 col-lg-12 col-11 d-flex">
            <input
              type="text"
              placeholder="Type in your hash to retrieve your secret"
              onChange={(e) => setHash(e.target.value)}
            />
            <button type="submit">submit</button>
          </form>
          <div className="display mt-3 mb-4">
            {newSecret ? (
              <p>
                your secret:
                <span>{newSecret}</span>
              </p>
            ) : (
              <span>secret not available!</span>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

// GetSecret.protoTypes = {
//   getSecret: PropTypes.func.isRequired,
//   newSecret: PropTypes.string.isRequired,
// };
