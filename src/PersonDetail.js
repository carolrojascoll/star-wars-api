// CAROLINA ROJAS COLLANTE
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${id}/`)
      .then(response => {
        setData(response.data);
        setError(null);
        axios.get(response.data.homeworld).then(res => {
          setData(prevData => ({ ...prevData, homeworldName: res.data.name }));
        });
      })
      .catch(() => {
        setError("Estos no son los droides que está buscando");
        setData(null);
      });
  }, [id]);

  return (
    <div>
      {error && <div>
        <p>{error}</p>
        <img src="https://path-to-obiwan-kenobi-image.jpg" alt="Obi-Wan Kenobi"/>
      </div>}
      
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Height: {data.height}</p>
          <p>Hair Color: {data.hair_color}</p>
          <p>Birth Year: {data.birth_year}</p>
          <p>Homeworld: {data.homeworldName}</p>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;
