interface Props {
  count: number;
  previous: string;
  next: string;
  planets: Record<string, string | string[]>[];
}

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

const PlanetsList: React.FC<Props> = ({ count, previous, next, planets }) => {
  const countRange = getCurrentRange({
    previous,
  });
  console.log("reange", countRange);
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
      <div>
        <button disabled={!previous}>{"<<"}</button>
        Showing {countRange} of {count} planets
        <button disabled={!next}>{">>"}</button>
      </div>
    </div>
  );
};

export default PlanetsList;
