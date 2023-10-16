import "./App.css";
import { Route } from "wouter";
import PlanetsList from "./PlanetsList";
import PlanetDetails from "./PlanetDetails";

function App() {
  return (
    <div>
      <Route path='/planet/:planetId' component={PlanetDetails} />
      <Route path='/planets/:pageNumber' component={PlanetsList} />
      <Route path='/' component={PlanetsList} />
    </div>
  );
}

export default App;
