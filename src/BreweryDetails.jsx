import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BreweryDetails = () => {
  let params = useParams();

  const [breweryDetails, setBreweryDetails] = useState({});

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch(
          `https://api.openbrewerydb.org/breweries/${params.id}`
        );
        const data = await response.json();
        setBreweryDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBreweries();
  }, [params.id]);

  return (
    <div className="BreweryDetails">
      <h1>{breweryDetails.name}</h1>
      <div>{`${breweryDetails.city}, ${breweryDetails.state}`}</div>
      <div>{`${breweryDetails.country}`} </div>

      {breweryDetails.phone && <div>Phone: {`${breweryDetails.phone}`} </div>}
      {breweryDetails.website_url && (
        <div>Web: {`${breweryDetails.website_url}`} </div>
      )}
    </div>
  );
};

export default BreweryDetails;
