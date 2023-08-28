import React, { useState } from 'react';

// 1. Create a card with info (img, name, id) and collapsable additional info (breed and status)
// 2. Collapsable details should include a button
// 3. Card should also include a 'Delete' button to delete the dog


// Define the DogCard component, responsible for displaying information about a single dog.
// It accepts two props: 'dog' for the dog's data and 'onDelete' for the delete function.
function DogCard({ dog, onDelete }) { 
  // Initialized the 'expanded' state to track whether additional details are shown.
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    // When the 'Delete' button is clicked, the function is triggered. 
    onDelete(dog.id); // Calls on the 'onDelete' function and pass the ID of the current dog
    console.log("handleDelete DogCard") // Log a message to the console for debugging
  };

  return (
    // 'dog' is the object with the properties of name, image, id, breed and status
    // 'dog' is the object is being passed to the 'DogCard' component as a prop. 
    // Every time 'DogCard' is rendered, a specific dog's data (name, image, id, breed, and status) is passed to represent the specific dog
    // personal note: rendering is the process of creating and displaying user interface components on the screen. 
    <div className="dog-card">
      {/* Displays dog image */}
      <img src={dog.imageUrl} alt={dog.name} />
      {/* Displays dog name */}
      <h3>{dog.name}</h3>
      <p>ID: {dog.id}</p>
      {/* Showing additional details only if 'expanded' stat is true */}
      {expanded && (
        <>
          {/* Displays dog breed */}
          <p>Breed: {dog.breed}</p>
          {/* Displays dog status */}
          <p>Status: {dog.status}</p>
        </>
      )}
      
      {/* 'expanded' is a state variable which can be true or false. !expanded being the inverse (`!`) meaning invert*/}
      <button onClick={() => setExpanded(!expanded)}> 
        {expanded ? 'Hide Details' : 'Expand Details'} {/* `condition ? value_if_true : value_if_false` is a ternary operator. 
        Depending whether the condition 'expanded' is `true` or `false` returns the two values: `value_if_true` or `value_if_faslse` 
        in this case, if expanded is `true` 'Hide Details' is returned, if `false` 'Show Details' is returned*/}
      </button>
      {/* Button to delete dog */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DogCard;

