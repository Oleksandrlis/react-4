import React from "react";

const Cast = ({ cast }) => (
  <ul>
    {cast.length > 0 ? (
      cast.map(elem => (
        <li key={elem.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${elem.profile_path}`}
            alt={elem.name}
          />
          <h3>{elem.name}</h3>
          <p>character: {elem.character}</p>
        </li>
      ))
    ) : (
      <p>We don't have any info about actors.</p>
    )}
  </ul>
);

export default Cast;
