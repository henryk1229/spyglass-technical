interface Props {
  count: number;
  previous: string;
  next: string;
  planets: Record<string, string | string[]>[];
}

const PlanetsList: React.FC<Props> = ({ count, previous, next, planets }) => {
  console.log("I MOUNT");
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
          return <div key={planet.name.toString()}>{planet.name}</div>;
        })}
      </div>
      <div>Showing of {count} planets</div>
    </div>
  );
};

export default PlanetsList;
