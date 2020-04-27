import { Subscription } from 'rxjs';
import { RecipeService } from './../../providers/recipe.service';
import { Recipe } from './../../models/recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  receita: Recipe;
  recipeSubs: Subscription;
  constructor(private _recipeService: RecipeService) { }
  ngOnDestroy() {
    this.recipeSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.recipeSubs = this._recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.receita = recipe;
      }
    );
  }

  receitaSeleccionada(evento: Recipe) {
this.receita = evento;
  }
}
