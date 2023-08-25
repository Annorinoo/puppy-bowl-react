// import { useState } from "react";

// // 1. Create a card with info (img, name, id) and collapsable additional info (breed and status)
// // 2. Collapsable details should include a button
// // 3. Card should also include a 'Delete' button to delete the dog

// function DogCard({dog, onDelete}) { // defining component DogCard w/ two props: dog and onDelete
//     const [expanded, setExpanded] = useState(false); // 1. false to have the details page collapsed upon loading

// //dog = object with info about the dog
// // onDelete = function to handle the delete action

//     const handleDelete = () => { // defining function: handleDelete. When called it starts the 'onDelete function' provided through props and passes the id of the 'dog' as an argument. 
//         onDelete(dog.id); // 
//     };

//     return (
//         <div className="dog-card"> {/*made to handle styling*/}
//             <img src={dog.imageUrl} alt={dog.name} /> {/*Displays dog img and alt*/}
//             <h3>{dog.name}</h3> {/*displays dog name*/}
//             <p>ID: {dog.id}</p> {/*displays dog ID*/}
//             {expanded && ( //Breed and status are only visable if expanded is 'true'
//                 <>
//                     <p>Breed: {dog.breed}</p>
//                     <p>Status: {dog.status}</p>
//                 </>
//             )}
//             <button onClick={() => setExpanded(!expanded)}>
//                 {expanded ? 'Hide Details' : 'Expand Details'} {/*if not expanded, 'display expand' || if expanded, display 'hide details'*/}
//             </button>
//             <button onClick={handleDelete}>Delete</button> {/*handleDelete function triggers 'onDelete' */}
//         </div>
//     )
// }

// export default DogCard
//DogCard.jsx
import React, { useState } from 'react';

function DogCard({ dog, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    onDelete(dog.id);
    console.log("handleDelete DogCard")
  };

  return (
    <div className="dog-card">
      <img src={dog.imageUrl} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>ID: {dog.id}</p>
      {expanded && (
        <>
          <p>Breed: {dog.breed}</p>
          <p>Status: {dog.status}</p>
        </>
      )}
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Details' : 'Expand Details'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DogCard;

