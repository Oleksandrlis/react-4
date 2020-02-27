import React from "react";

const Reviews = ({ reviews }) => (
  <ul>
    {reviews.length > 0 ? (
      reviews.map(elem => (
        <li key={elem.id}>
          <h3>Author: {elem.author}</h3>
          <p>{elem.content}</p>
        </li>
      ))
    ) : (
      <p>We don't have any reviews for this movie.</p>
    )}
  </ul>
);

export default Reviews;
