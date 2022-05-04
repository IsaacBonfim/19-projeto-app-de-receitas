import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Food from './Pages/Food';
import Drink from './Pages/Drink';
import FoodDetails from './Pages/FoodDetails';
import DrinkDetails from './Pages/DrinkDetails';
import FoodProgress from './Pages/FoodProgress';
import DrinkProgress from './Pages/DrinkProgress';
import Explore from './Pages/Explore';
import ExploreFood from './Pages/ExploreFoods';
import ExploreDrink from './Pages/ExploreDrinks';
import ExploreFoodIngred from './Pages/ExploreFoodIngred';
import ExploreDrinkIngred from './Pages/ExploreDrinkIngred';
import ExploreFoodNational from './Pages/ExploreFoodNational';
import Profile from './Pages/Profile';
import DoneRecipe from './Pages/DoneRecipe';
import FavoriteRecipes from './Pages/FavoriteRecipe';

function Routes() {
  return (
    <Switch>
      <Route exact path="/foods" component={ Food } />
      <Route exact path="/drinks" component={ Drink } />
      <Route exact path="/foods/:id" component={ FoodDetails } />
      <Route exact path="/drinks/:id" component={ DrinkDetails } />
      <Route exact path="/foods/:id/in-progress" component={ FoodProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFood } />
      <Route exact path="/explore/drinks" component={ ExploreDrink } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreFoodIngred } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreDrinkIngred } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodNational }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipe } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
