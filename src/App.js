import React, {useEffect} from "react";
import SignIn from './components/SignIn/index'
import SignUp from './components/SignUp/index'
import AllPublicEntries from './components/Entries'
import LoadingPage from './components/commons/LoadingPage'
import { Route, Switch } from "react-router-dom";
import IntroPage from './components/Intro'
import Gallery from './components/ImageGallery'
import Editor from './components/Editor'
import CreateNewEntry from './components/CreateNewEntry'
import MyProfile from './components/Profile/index'
import EditProfileForm from './components/EditProfileForm'
import ModifyEntry from './components/ModifyEntry'
import EntryDetails from './components/EntryDetails'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCamera, faEye, faTrash, faEdit, faCheck,faWindowMaximize, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import Reminder from './components/Reminder';
library.add (faCamera,faEye,
  faTrash,
  faEdit, faCheck,faWindowMaximize,faWindowMinimize) 
function App() {

  return (
    <>
      <Switch>
      <Route 
            path="/my-profile"
            component={(MyProfile)}
          />
          <Route
            path="/edit-profile"
            component={(EditProfileForm)}
          />
          <Route
            path="/modify-entry/:entryId"
            component={(ModifyEntry)}
          />
          <Route
            path="/entry-details/:entryId"
            component={(EntryDetails)}
          />
      <Route
            exact
            path="/gallery"
            component={( Gallery)}
          />
           <Route
            exact
            path="/reminder"
            component={( Reminder)}
          />
          <Route
            exact
            path="/new-entry"
            component={( CreateNewEntry)}
          />
          <Route
            exact
            path="/"
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
