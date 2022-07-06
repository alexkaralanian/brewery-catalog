import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BreweryList = () => {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch(
          'https://api.openbrewerydb.org/breweries?per_page=10'
        );
        const data = await response.json();
        setBreweries(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBreweries();
  }, []);

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div>
      <h1>Brewery List</h1>
      <input
        data-testid="search-input"
        onChange={handleChange}
        className="SearchInput"
        type="text"
        value={searchTerm}
        placeholder="Search Breweries..."
      />
      <ul data-testid="brewery-list">
        {breweries.length > 0 &&
          breweries
            .filter(
              (brewery) =>
                brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                brewery
            )
            .map((brewery) => (
              <li key={brewery.id}>
                <Link to={`/${brewery.id}`}>
                  <h4>{brewery.name}</h4>
                </Link>
                <div>{`${brewery.city}, ${brewery.state}`}, </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default BreweryList;
