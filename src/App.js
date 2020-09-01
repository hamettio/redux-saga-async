import React from "react";
import { Provider } from "react-redux";
import AsyncApp from "./components/AsyncApp";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <AsyncApp />
    </Provider>
  );
};

export default App;
