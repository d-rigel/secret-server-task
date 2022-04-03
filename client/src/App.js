import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import Axios from "axios";
import { SecretPage } from "./components/SecretPage";

function App() {
  const [secretList, setSecretList] = useState([]);
  const [hashList, setHashList] = useState([]);

  const addSecret = (secretText, expireAfter) => {
    Axios.post("/v1/secret", {
      secretText,
      expireAfter,
    }).then((res) => {
      const { result } = res.data;
      setSecretList(result?.hash);
    });
  };

  const getSecret = (hash) => {
    Axios.get(`/v1/secret/${hash}`).then((res) => {
      const { result } = res.data;

      console.log(result);
      setHashList(result);
    });
  };

  return (
    <>
      <Header />
      <SecretPage
        addSecret={addSecret}
        getSecret={getSecret}
        secretList={secretList}
        hashList={hashList}
      />
    </>
  );
}

export default App;
