import React from "react";
import { StoreSecret } from "./StoreSecret";
import { GetSecret } from "./GetSecret";

export const SecretPage = ({ addSecret, getSecret, secretList, hashList }) => {
  const mapFunction = () => {
    const check = hashList.length ? (
      hashList.map((sec, i) => {
        return (
          <GetSecret newSecret={sec.secret} key={i} getSecret={getSecret} />
        );
      })
    ) : (
      <GetSecret getSecret={getSecret} />
    );
    return check;
  };
  return (
    <div className="container mt-5">
      <div className="section">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <StoreSecret addSecret={addSecret} secretList={secretList} />
          </div>
          <div className="col-lg-6 col-md-12">{mapFunction()}</div>
        </div>
      </div>
    </div>
  );
};
