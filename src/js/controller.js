import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js'

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //console.log(id);

    if (!id) return;

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //
    recipeView.renderSpinnner();

    //
    await model.loadRecipe(id);

    //
    recipeView.render(model.state.recipe);

    bookmarksView.update(model.state.bookmarks);

  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinnner();

    //Get Search query
    const query = searchView.getQuery();
    if (!query) return;

    //Load search results
    await model.loadSearchResults(query);

    //Render results
    resultsView.render(model.getSearchResultsPage());

    //Render initial pagination
    paginationView.render(model.state.search);

  } catch (err) {
    console.error(err);
  }
}

const controlPagination = function (goToPage) {
  console.log(goToPage);
  //Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render new pagination
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  //Update recipe servings
  model.updateServings(newServings);

  //Update recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);
  try {
    addRecipeView.renderSpinnner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }

}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();



