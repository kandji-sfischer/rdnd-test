import React from "react";
import PreviewBox from "./PreviewBox/App";
import Multi from "./Multi/App";
import Reducer from "./Reducer/App";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Reducer} />
        <Route path="/box" component={PreviewBox} />
        <Route path="/shift" component={Multi} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
