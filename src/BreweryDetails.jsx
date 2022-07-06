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

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  return (
    <div className="BreweryDetails">
      <h1>{breweryDetails.name}</h1>
      <div>{`${breweryDetails.city}, ${breweryDetails.state}`}</div>
      <div>{`${breweryDetails.country}`} </div>

      {breweryDetails.phone && (
        <div>
          Phone:{' '}
          <a href={`tel:${breweryDetails.phone}`}>{`${formatPhoneNumber(
            breweryDetails.phone
          )}`}</a>
        </div>
      )}
      {breweryDetails.website_url && (
        <div>
          Web:{' '}
          <a href={breweryDetails.website_url}>
            {`${breweryDetails.website_url}`}{' '}
          </a>
        </div>
      )}
    </div>
  );
};

export default BreweryDetails;
