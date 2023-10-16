import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import ResidentsList from "./ResidentsList";
import { capitalCase } from "change-case";

type PlanetData = Record<string, string | string[]> | null;

const fetchPlanetData = async (planetId: number) => {
  return await fetch(`https://swapi.dev/api/planets/${planetId}`).then((res) =>
    res.json()
  );
};

const PlanetDetails: React.FC = () => {
  // determin planetId via url params
  const { planetId } = useParams();

  const [, setLocation] = useLocation();

  // hold planetData in state after fetching
  const [planetData, setPlanetData] = useState<PlanetData>(null);

  useEffect(() => {
    // fetch planet data and set state
    fetchPlanetData(planetId).then((res: PlanetData) => {
      setPlanetData(res);
    });
  }, [planetId]);

  // handle loading state
  if (!planetData) {
    return (
      <div style={{ fontWeight: "bold" }}>Retrieving planetary details...</div>
    );
  }

  // separate name and residents keys for special handling
  const { name, residents, ...rest } = planetData;

  // satisfy typescript
  const residentsUrls = Array.isArray(residents) ? residents : [];

  // for now, we won't show this data to the user
  const dataNotToDisplay = ["films", "created", "edited", "url"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontWeight: "bold", margin: "16px" }}>{name}</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ margin: "8px" }}>
          <div style={{ fontWeight: "bold" }}>Basic Facts</div>
          <ul>
            {Object.keys(rest)
              .filter((key) => !dataNotToDisplay.includes(key))
              .map((detail) => {
                return (
                  <li key={detail}>
                    {capitalCase(detail)}: {planetData[detail]}
                  </li>
                );
              })}
          </ul>
        </div>
        <ResidentsList residentsUrls={residentsUrls} />
      </div>
      <button onClick={() => setLocation("/planets/")}>
        This is not the planet I'm searching for...
      </button>
    </div>
  );
};

export default PlanetDetails;
