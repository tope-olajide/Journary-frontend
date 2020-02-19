import React from "react";
import SignIn from "./components/SignIn/index";
import SignUp from "./components/SignUp/index";
import AllPublicEntries from "./components/Entries";
import { Route, Switch } from "react-router-dom";
import IntroPage from "./components/Intro";
import Gallery from "./components/ImageGallery";
import CreateNewEntry from "./components/CreateNewEntry";
import MyProfile from "./components/Profile/index";
import EditProfileForm from "./components/EditProfileForm";
import ModifyEntry from "./components/ModifyEntry";
import EntryDetails from "./components/EntryDetails";
import { library } from "@fortawesome/fontawesome-svg-core";
import Reminder from "./components/Reminder";
import withAuthorization from "./utils/withAuthorization";
/* import LoadingAnimation from "./components/commons/LoadingPage" */
import {
  faCamera,
  faEye,
  faTrash,
  faEdit,
  faCheck,
  faWindowMaximize,
  faWindowMinimize, faExclamationTriangle, faHeart
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCamera,
  faEye,
  faTrash,
  faEdit,
  faCheck,
  faWindowMaximize,
  faWindowMinimize, faExclamationTriangle, faHeart
);
function App() {
  return (
    <>
      <Switch>
        <Route path="/my-profile" component={withAuthorization(MyProfile)} />
        <Route path="/edit-profile" component={withAuthorization(EditProfileForm)} />
        <Route path="/modify-entry/:entryId" component={withAuthorization(ModifyEntry)} />
        <Route path="/entry-details/:entryId" component={withAuthorization(EntryDetails)} />
        <Route exact path="/gallery" component={withAuthorization(Gallery)} />
        <Route exact path="/reminder" component={withAuthorization(Reminder)} />
        <Route exact path="/new-entry" component={withAuthorization(CreateNewEntry)} />
        <Route exact path="/" component={withAuthorization(AllPublicEntries)} />
        <Route exact path="/intro" component={IntroPage} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/create-account" component={SignUp} />
        {/* <Route exact path="/loading" component={LoadingAnimation} /> */}
      </Switch>
    </>
  );
}

export default App;
