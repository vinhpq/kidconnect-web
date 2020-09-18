import React from 'react';
import './App.css';
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login";
import Header from "./Header"
import Dashboard from './Dashboard';

function App() {
  const [{user}, dispatch] = useStateValue();


  return (
    <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Switch>
                <Route path="/">
                  <Dashboard />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
  );
}

export default App;
