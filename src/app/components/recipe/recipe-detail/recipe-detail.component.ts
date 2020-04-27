import { RecipeService } from './../../../providers/recipe.service';
import { Recipe } from './../../../models/recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
//import { relative } from 'path';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recetaDetalhes: Recipe;
  id: number;
  constructor(private _recipeService: RecipeService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.recetaDetalhes = this._recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoopingList() {
    this._recipeService.addIngredientsToShoopingList(this.recetaDetalhes.ingredients);
  }

  onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._activatedRoute });
  }

  onDeleteRecipe(){
    this._recipeService.deleteRecipe(this.id);
    this._router.navigate(['/recipes']);
  }
}
