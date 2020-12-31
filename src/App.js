import React, {useEffect} from 'react';
import './App.css';
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login";
import Header from "./Header"
import DashboardUser from './DashboardUser';
import DashboardAdmin from './DashboardAdmin'
import { auth } from './firebase'
import { actionTypes } from "./Reducer";

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log('user logged in')
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser
        })
      } else {
        console.log('user logged out')
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        })
      }
    })
  }, [])


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
                { user.email === "demo@nbs.com" ?
                <DashboardAdmin /> : <DashboardUser /> }
              </Route>
            </Switch>

            {/* <Switch>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch> */}
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
