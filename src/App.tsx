import { useEffect, useState } from "react";
import "./App.css";
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

  useEffect(() => {
    // fetch planets and set state
    fetchSWAPIData().then((res: PageData) => {
      setPageData(res);
    });
  }, []);

  return (
    <div>
      {pageData?.count ? (
        <PlanetsList
          count={pageData.count}
          previous={pageData.previous}
          next={pageData.next}
          planets={pageData.results}
        />
      ) : (
        <div style={{ fontWeight: "bold" }}>
          A long time ago, in a galaxy far, far away...
        </div>
      )}
    </div>
  );
}

export default App;
