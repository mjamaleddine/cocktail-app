import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [cocktails, setCocktails] = useState([]);
  const [ingredient, setIngredient] = useState('Gin'); // default ingredient

  useEffect(() => {
    if (!ingredient) return; // if no ingredient is specified, don't fetch

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => response.json())
      .then(data => {
        setCocktails(data.drinks);
      })
      .catch(error => console.log(error));
  }, [ingredient]);

  const handleSearch = (event) => {
    event.preventDefault();
    const inputIngredient = event.target.elements.ingredient.value.trim();
    setIngredient(inputIngredient);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Our Cocktail App</h2>
        <form onSubmit={handleSearch}>
          <input
            name="ingredient"
            type="text"
            placeholder="Enter ingredient (e.g., Gin)"
            defaultValue={ingredient}
          />
          <button type="submit">Search</button>
        </form>
        <div className="card-container">
          {cocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="card">
              <h2>{cocktail.strDrink}</h2>
              <img alt="cocktail" width="200px" src={cocktail.strDrinkThumb}/>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
