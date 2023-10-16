import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";

type PageData = {
  count: number;
  previous: string;
  next: string;
  results: Record<string, string | string[]>[];
} | null;

const fetchSWAPIData = async (pageNumber: number) => {
  if (pageNumber) {
    return await fetch(
      `https://swapi.dev/api/planets/?page=${pageNumber}`
    ).then((res) => res.json());
  }
  return await fetch("https://swapi.dev/api/planets").then((res) => res.json());
};

const getCurrentRange = ({ previous }: { previous: string }): string => {
  // if previous is null, pageNumber should be 0
  const prevPageNumber = previous ? parseInt(previous.split("=")[1], 10) : 0;
  // e.g 1, 21, 31
  const firstNumber = prevPageNumber * 10 + 1;
  // e.g 10, 20, 30
  const secondNumber = prevPageNumber * 10 + 10;
  // e.g 1-10, 21-30
  return `${firstNumber} - ${secondNumber}`;
};

const PlanetsList: React.FC = () => {
  // handle router logic
  const { pageNumber } = useParams();
  const [, setLocation] = useLocation();

  // hold SWAPI pageData in state
  const [pageData, setPageData] = useState<PageData>(null);

  // run on mount to fetch initial list of planets
  useEffect(() => {
    // fetch planet data and set state
    fetchSWAPIData(pageNumber).then((res: PageData) => {
      setPageData(res);
    });
  }, [pageNumber]);

  const handleClickPrevious = () => {
    const prevPageNumber = previous.split("=")[1];
    setLocation(`/planets/${prevPageNumber}`);
  };

  const handleClickNext = () => {
    const nextPageNumber = next.split("=")[1];
    setLocation(`/planets/${nextPageNumber}`);
  };

  const handleClickPlanetName = (ev: React.BaseSyntheticEvent) => {
    const planetName = ev.target.innerHTML;
    const planetUrl = pageData?.results.find(
      (planet) => planet.name === planetName
    )?.url;
    const splitUrl = planetUrl?.toString().split("/");
    // id will be second to last item in array, e.g '['/', '22', '/']
    const planetId = splitUrl?.[splitUrl.length - 2];
    console.log("id", planetId);
    setLocation(`/planet/${planetId}`);
  };

  // handle loading state
  if (!pageData) {
    return (
      <div style={{ fontWeight: "bold" }}>
        A long time ago, in a galaxy far, far away...
      </div>
    );
  }

  // display list of planets and page data
  const { count, previous, next, results: planets } = pageData;
  const countRange = getCurrentRange({
    previous,
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div>Click on a planet to learn more details</div>
      <div>
        {planets.map((planet) => {
          return (
            <div
              key={planet.name.toString()}
              style={{ cursor: "pointer" }}
              onClick={handleClickPlanetName}
            >
              {planet.name}
            </div>
          );
        })}
      </div>
      <div>
        <button disabled={!previous} onClick={handleClickPrevious}>
          {"<<"}
        </button>
        Showing {countRange} of {count} planets
        <button disabled={!next} onClick={handleClickNext}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default PlanetsList;
