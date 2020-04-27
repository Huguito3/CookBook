import { Subscription } from 'rxjs';
import { RecipeService } from './../../../providers/recipe.service';
import { Recipe } from './../../../models/recipe.model';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() receitaClickada = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;
  // recipes: Recipe [] = [
  //   new Recipe('A test Recipe','A teste recipe for test ',
  //   'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg'),
  //   new Recipe('A test Recipe 2','A teste recipe for test 2 ',
  //   'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg')
  // ];
  constructor(private _recipeService: RecipeService, private router: Router, private _activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this._recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this._recipeService.getRecipes();
  }
  itemSeleccionado(indice) {
    //this.receitaClickada.emit(this.recipes[indice]);
    this._recipeService.recipeSelected.next(this.recipes[indice]);
  }

  btnNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this._activatedRoute });
  }
}
