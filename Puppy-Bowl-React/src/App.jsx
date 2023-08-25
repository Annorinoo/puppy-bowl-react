//App.jsx
import React, { useState, useEffect } from 'react';
import DogList from './components/DogList';
import AddDogForm from './components/AddDogForm';
import './App.css';

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setDogs(data.data.players);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addDog = (dog) => {
    setDogs([...dogs, dog]);
    console.log("addDog App.jsx")
  };

  const deleteDog = async (id) => {
    try {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedDogs = dogs.filter((dog) => dog.id !== id);
        setDogs(updatedDogs);
      } else {
        console.error('Error deleting dog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting dog:', error);
    }
  };

  return (
    <div className="App">
      <h1>Puppy Bowl</h1>
      <DogList dogs={dogs} onDelete={deleteDog} />
      <AddDogForm onAdd={addDog} />
    </div>
  );
}

export default App;