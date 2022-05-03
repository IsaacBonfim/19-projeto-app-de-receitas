export const getDoneRecipe = () => {
  if (localStorage.getItem('doneRecipes')) {
    let aux = localStorage.getItem('doneRecipes');
    aux = JSON.parse(aux);
    const ids = aux.map((recipe) => recipe.id);

    return ids;
  }
};

export const getRecipeInProgress = (key) => {
  if (localStorage.getItem('inProgressRecipes')) {
    let aux = localStorage.getItem('inProgressRecipes');
    aux = JSON.parse(aux);
    const recipes = aux[key];

    return recipes;
  }
};
