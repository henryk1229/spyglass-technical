import { useEffect, useState } from "react";
import { useParams } from "wouter";
import ResidentsList from "./ResidentsList";

type PlanetData = Record<string, string | string[]> | null;

const fetchPlanetData = async (planetId: number) => {
  return await fetch(`https://swapi.dev/api/planets/${planetId}`).then((res) =>
    res.json()
  );
};

const PlanetDetails: React.FC = () => {
  // determin planetId via url params
  const { planetId } = useParams();

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

  const { name, residents, films, ...rest } = planetData;

  // satisfy typescript
  const residentsUrls = Array.isArray(residents) ? residents : [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          Basic facts:
          {Object.keys(rest).map((detail) => {
            return (
              <div key={detail}>
                {detail}: {planetData[detail]}
              </div>
            );
          })}
        </div>
        <ResidentsList residentsUrls={residentsUrls} />
      </div>
    </div>
  );
};

export default PlanetDetails;
