import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DogList from './components/DogList';
import AddDogForm from './components/AddDogForm';
import './App.css';

// Define main App component
function App() {

  // useState hook to return an array with two elements: current state value, and a function to update that value
  // 'dogs' holds the current value of the state = array of dogs
  // 'setDogs' function to update the value of 'dogs'. When called with a new value, it will trigger a re-render of the component and update the state
  const [dogs, setDogs] = useState([]);

  // Async function fetchData to initiate a network test to a specific URL may take time. 
  async function fetchData () {
    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players');
      // Use .json() method to parse (transforming data to a more organized structure = JavaScript object) the response body as JSON
      // "response body" is part of the server's response that contains the actual data we want (for this, 'dogs')
      // Use await to pause the execution until the JSON data is parsed and available
      const data = await response.json();
      // Checking if API request is successful. 
      if (data.success) {
        // Calling 'setDogs' to re-render the component within the updated state.
        // When we reload the site, it will always fetch and check the API for the most update state. 
        // 'data.data.players' 1st `data` refers to the parsed JSON response object ('const data = await response.json()')
        // within the object `data` we are accessing another property named 'data'. The inner `data` holds specific data relating to `players`
        // within the inner `data` we are accessing the `players` property. We now set `players` as 'dogs' in this line. 
        // We map the API data to the terminology that makes sense in the application
        setDogs(data.data.players);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData();
  },[]);

  // function 'addDog' with `dog` as the parameter 
  const addDog = async(dog) => {
    // Uses 'setDogs' function (provided by the 'useState' hook) to update the 'dogs' state
    // [...dogs, dog] is an expression to create a new array. '...' is a spread operator to copy all the elements from the existing 'dogs' array. 
    //(aka, contents of 'dogs' are duplicated into a new array)
    // then adds the new 'dog' object to the end of the copied array
    setDogs([...dogs, dog]);
    console.log("addDog App.jsx")
  };

  // Async arrow function to delete a dog using 'id' as a parameter.
  const deleteDog = async (id) => {
    try {
      // sends a DELETE request to the API for the specific dog using the provided 'id'.
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-pt-web-pt/players/${id}`, {
        method: 'DELETE',
      });
      // Checking for response if OK, meaning deletion was successful.
      if (response.ok) {
        // create a new array by filtering out the dog with the matching 'id' effectively removing the delete dog from the array. 
        // 'dogs' is the current state value that contains all dog objects
        // Filter method is called onto the 'dogs' array. For each 'dog' object in the array the callback function checks if the 'id' of 
        // the dog DOES NOT match the specified 'id' that was deleted. If TRUE, it will re-render the component with the new state. 
        const updatedDogs = dogs.filter((dog) => dog.id !== id);
        // Using the 'setDogs' function provided by 'useState', iut will update the state of 'dogs'
        // By calling 'setDogs' with a new array = 'updatedDogs' we are signaling to the app to update the component's state. Trigerring a re-render
        setDogs(updatedDogs);
      } else {
        // When filtering the 'dogs' array. If the id of the dog DOES NOT match the 'id' is FALSE (it matches). Indicate the error 'Error deleteing dog:'
        console.error('Error deleting dog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting dog:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Puppy Bowl</h1>
        <Routes>
          <Route path="/" element={<DogList dogs={dogs} onDelete={deleteDog} />} />
          <Route path="/add" element={<AddDogForm onAdd={addDog} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*1. dog:

The term 'dog' represents an individual dog object. It's a single object that holds information about a specific dog, including its name, 
image URL, ID, breed, and status. You use the term 'dog' when you're referring to a single instance of a dog object, such as in the DogCard 
component. Each time you render a DogCard, you're passing a specific 'dog' object as a prop to that component.

2. dogs:

The term 'dogs' is used to represent an array of dog objects. It's a collection of multiple 'dog' objects. In your App component, you're 
using the 'dogs' array to hold multiple dog objects fetched from the API. The array is being managed in the state with the useState hook.
When you map through the 'dogs' array to render multiple DogCard components, you're using the term 'dogs' to refer to the entire collection of 
dog objects.

To illustrate:

In App.jsx, when you set the initial state using const [dogs, setDogs] = useState([]);, you're initializing an empty array named 'dogs' to 
store multiple dog objects.

In the App component, you're using 'dogs' to refer to this array, for example, in the line DogList dogs={dogs} onDelete={deleteDog} />, you're 
passing the entire array of dog objects to the DogList component.

In DogCard.jsx, when you define the DogCard component, you're using 'dog' to refer to a single dog object. It's the specific dog object that 
is passed as a prop to each individual DogCard component when rendering the list of dogs.

So, in summary, 'dog' refers to a single dog object, and 'dogs' refers to an array of dog objects. They are used differently based 
on whether you're dealing with an individual dog or a collection of dogs.
*/