import { Ingredient } from 'src/app/models/ingredient.model';

import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ShoopingListService } from './shooping-list.service';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  //
  private recipes: Recipe[] = [];
  constructor(private _shoopListService: ShoopingListService) { }

  getRecipes() {
    //Hacemos esto para retornar una copia del valor original, si no ponemos el slice estamos haciendo referencia al valor original
    return this.recipes.slice();
  }

  addIngredientsToShoopingList(ingredientes: Ingredient[]) {
    this._shoopListService.addIngredientsFromRecipe(ingredientes);
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newrecipe: Recipe) {
    this.recipes[index] = newrecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
