import { useEffect, useState } from "react";

interface ResidentsListProps {
  residentsUrls: string[];
}

const fetchResidentData = async (residentUrl: string) => {
  return await fetch(`${residentUrl}`).then((res) => res.json());
};

const fetchAllResidentsData = async (residentsUrls: string[]) => {
  const residentsData = [];
  for (const url of residentsUrls) {
    const residentData = await fetchResidentData(url);
    residentsData.push(residentData);
  }
  return residentsData;
};

const ResidentsList: React.FC<ResidentsListProps> = ({ residentsUrls }) => {
  const [residentNames, setResidentsNames] = useState<string[] | null>(null);

  useEffect(() => {
    if (residentsUrls.length > 0) {
      fetchAllResidentsData(residentsUrls).then((res) => {
        const residentNames = res.map((resident) => resident.name);
        setResidentsNames(residentNames);
      });
    }
  }, [residentsUrls]);

  return (
    <div style={{ margin: "8px" }}>
      <div style={{ fontWeight: "bold" }}>Residents</div>
      {residentsUrls.length > 0 ? (
        residentNames ? (
          <ul>
            {residentNames.map((name) => {
              return <li key={name}>{name}</li>;
            })}
          </ul>
        ) : (
          <div style={{ margin: "16px" }}>Retrieving data...</div>
        )
      ) : (
        <div>No known residents</div>
      )}
    </div>
  );
};

export default ResidentsList;
