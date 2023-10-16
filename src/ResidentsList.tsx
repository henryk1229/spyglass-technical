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

  // if a planet has no residents
  if (residentsUrls.length < 1) {
    return <div>No known residents</div>;
  }

  return residentNames ? (
    <div>
      Residents:
      <ul>
        {residentNames.map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </div>
  ) : (
    <div>Retrieving data...</div>
  );
};

export default ResidentsList;
