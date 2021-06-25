import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ListBooks from "./pages/books/ListBooks";
import Dashboard from "./pages/dashboard/Dashboard";
import Members from "./pages/members/Members";
import Genres from "./pages/books/Genres";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/books" component={ListBooks} />
        <Route path="/members" component={Members} />
        <Route path="/genre" component ={Genres} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
