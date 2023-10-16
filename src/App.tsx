import { useEffect, useState } from "react";
import "./App.css";
import { Route } from "wouter";
import PlanetsList from "./PlanetsList";

// TODO - clean up + consolidate typing
type PageData = {
  count: number;
  previous: string;
  next: string;
  results: Record<string, string | string[]>[];
} | null;

// TODO - expand fetch fn to handle different endpoints + pagination
const fetchSWAPIData = async () => {
  return await fetch("https://swapi.dev/api/planets").then((res) => res.json());
};

function App() {
  // hold paginated planets data in state
  const [pageData, setPageData] = useState<PageData>(null);

  // run on mount to fetch initial list of planets
  useEffect(() => {
    // fetch planet data and set state
    fetchSWAPIData().then((res: PageData) => {
      setPageData(res);
    });
  }, []);

  return (
    <div>
      <Route path='/planets/:pageNumber' component={PlanetsList} />
      <Route path='/' component={PlanetsList} />
    </div>
  );
}

export default App;
