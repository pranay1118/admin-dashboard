import React from "react";
import Header from "./components/Header";
import './App.css';
import Users from "./components/Users";
const App = () => {
  return (
    <>
      <Header />
      <br/>
      <div className="content">
        <div className="sub_content">
          <Users/>
        </div>
      </div>
    </>
  );
};

export default App;
