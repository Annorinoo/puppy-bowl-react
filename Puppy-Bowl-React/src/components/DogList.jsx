//DogList.Jsx
import React from 'react';
import DogCard from './DogCard';
import './DogList.css';

// dogs, onDelete are parameters
function DogList({ dogs, onDelete }) {
  return (
    <div className="dog-list">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default DogList;

