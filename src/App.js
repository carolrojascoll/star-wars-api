// CAROLINA ROJAS COLLANTE
import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PersonDetail from './PersonDetail';

const App = () => {
  const [resource, setResource] = useState('people');
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    axios.get(`https://swapi.dev/api/${resource}/${id}/`)
      .then(response => {
        setData(response.data);
        setError(null);
        if (resource === 'people') {
          axios.get(response.data.homeworld).then(res => {
            setData(prevData => ({ ...prevData, homeworldName: res.data.name }));
          });
        }
      })
      .catch(() => {
        setError("Estos no son los droides que está buscando");
        setData(null);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
    navigate(`/${id}`);
  };

  return (
    <div>
      <h1>Star Wars API</h1>
      <form onSubmit={handleSubmit}>
        <select value={resource} onChange={e => setResource(e.target.value)}>
          <option value="people">People</option>
          <option value="films">Films</option>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
          <option value="species">Species</option>
          <option value="planets">Planets</option>
        </select>
        <input
          type="number"
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="Enter ID"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div>
        <p>{error}</p>
        <img src="https://path-to-obiwan-kenobi-image.jpg" alt="Obi-Wan Kenobi"/>
      </div>}

      {data && (
        <div>
          <h2>{data.name || data.title}</h2>
          {resource === 'people' && (
            <div>
              <p>Height: {data.height}</p>
              <p>Hair Color: {data.hair_color}</p>
              <p>Birth Year: {data.birth_year}</p>
              <p>Homeworld: {data.homeworldName}</p>
            </div>
          )}
          {/* Add other resource fields here as needed */}
        </div>
      )}

      <Routes>
        <Route path="/:id" element={<PersonDetail />} />
      </Routes>
    </div>
  );
};

export default App;
