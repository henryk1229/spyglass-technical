import { useEffect, useState } from "react";
import { useParams } from "wouter";

type PlanetData = Record<string, string | string[]> | null;

const fetchPlanetData = async (planetId: number) => {
  return await fetch(`https://swapi.dev/api/planets/${planetId}`).then((res) =>
    res.json()
  );
};

const PlanetDetails: React.FC = () => {
  // handle router logic
  const { planetId } = useParams();
  // const [, setLocation] = useLocation();

  // hold planetData in state after fetching
  const [planetData, setPlanetData] = useState<PlanetData>(null);

  // // run on mount to fetch initial list of planets
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

  const { name, ...rest } = planetData;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div>
        {Object.keys(rest).map((detail) => {
          return (
            <div key={detail}>
              {detail}: {planetData[detail]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanetDetails;
