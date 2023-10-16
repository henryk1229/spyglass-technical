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

  // if a planet has residents, fetch data for each
  useEffect(() => {
    if (residentsUrls.length > 0) {
      fetchAllResidentsData(residentsUrls).then((res) => {
        // we only want to display the residents name as a planetary detail
        const residentNames = res.map((resident) => resident.name);
        setResidentsNames(residentNames);
      });
    }
  }, [residentsUrls]);

  // if a planet has no residents, show 'no known...', otherwise show 'retrieving...' while fetching, then list the names
  return (
    <div style={{ margin: "8px" }}>
      <div style={{ fontWeight: "bold" }}>Residents</div>
      {residentsUrls.length > 0 ? (
        residentNames ? (
          <>
            {residentNames.map((name) => {
              return (
                <div key={name} style={{ margin: "8px" }}>
                  {name}
                </div>
              );
            })}
          </>
        ) : (
          <div style={{ margin: "8px" }}>Retrieving data...</div>
        )
      ) : (
        <div style={{ margin: "8px" }}>No known residents</div>
      )}
    </div>
  );
};

export default ResidentsList;
