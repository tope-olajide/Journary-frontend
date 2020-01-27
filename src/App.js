import React from "react";
import SignIn from './components/SignIn/index'
import SignUp from './components/SignUp/index'
import AllPublicEntries from './components/Entries'
import LoadingPage from './components/commons/LoadingPage'
import { Route, Switch } from "react-router-dom";
import IntroPage from './components/Intro'
import Gallery from './components/ImageGallery'
import Editor from './components/Editor'
import CreateNewEntry from './components/CreateNewEntry'
function App() {
  return (
    <>
      <Switch>
      <Route
            exact
            path="/"
            component={( Gallery)}
          />
          <Route
            exact
            path="/new-entry"
            component={( CreateNewEntry)}
          />
          <Route
            exact
            path="/public-entries"
            component={(AllPublicEntries)}
          />
      <Route
            exact
            path="/sign-in"
            component={(SignIn)}
          />
<Route
            exact
            path="/create-account"
            component={(SignUp)}
          />
      
      </Switch>
    </>
  );
}

export default App;
