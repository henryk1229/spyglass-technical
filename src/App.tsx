import "./App.css";
import { Route, Switch } from "wouter";
import PlanetsList from "./PlanetsList";
import PlanetDetails from "./PlanetDetails";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <Switch>
      <Route path='/planet/:planetId' component={PlanetDetails} />
      <Route path='/planets/:pageNumber' component={PlanetsList} />
      <Route path='/planets' component={PlanetsList} />
      <Route path='/' component={PlanetsList} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export default App;
