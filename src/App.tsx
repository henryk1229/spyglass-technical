import "./App.css";
import { Route } from "wouter";
import PlanetsList from "./PlanetsList";

function App() {
  return (
    <div>
      <Route path='/planets/:pageNumber' component={PlanetsList} />
      <Route path='/' component={PlanetsList} />
    </div>
  );
}

export default App;
